import HeaderComponent from "../view/header-component.js";
import FormAddExpenseComponent from "../view/form-add-expence-component.js";
import FilterComponent from "../view/filter-component.js";
import ExpenseListComponent from "../view/expense-list-component.js";
import ExpenseComponent from "../view/expense-component.js";
import EditExpenseComponent from "../view/edit-expence-component.js";
import { render, RenderPosition } from "../framework/render.js";

export default class ExpensePresenter {
  constructor({ headerContainer, formContainer, boardContainer, model }) {
    this.headerContainer = headerContainer;
    this.formContainer = formContainer;
    this.boardContainer = boardContainer;
    this.model = model;

    this.currentFilter = 'all';
    this.model.addObserver(this.handleModelChange.bind(this));
  }

  init() {
    render(new HeaderComponent(), this.headerContainer, RenderPosition.BEFOREEND);

    this.formComp = new FormAddExpenseComponent(this.handleAddExpense.bind(this));
    render(this.formComp, this.formContainer, RenderPosition.BEFOREEND);

    this.filterComp = new FilterComponent(this.handleFilterChange.bind(this));
    render(this.filterComp, this.formContainer, RenderPosition.BEFOREEND);

    this.listComp = new ExpenseListComponent();
    render(this.listComp, this.boardContainer, RenderPosition.BEFOREEND);

    this.renderExpenses();
  }

  handleModelChange() {
    this.renderExpenses();
  }

  renderExpenses() {
    const ul = this.listComp.getElement().querySelector('#expense-list');
    ul.innerHTML = '';

    const expenses = this.model.getByCategory(this.currentFilter);

    expenses.forEach(expense => {
      const expenseComp = new ExpenseComponent(expense, {
        onEdit: this.handleEdit.bind(this),
        onDelete: this.handleDelete.bind(this)
      });
      render(expenseComp, ul, RenderPosition.BEFOREEND);
    });
  }

  handleAddExpense(newExpense) {
    this.model.addExpense(newExpense);
  }

  handleDelete(id) {
    this.model.deleteExpense(id);
  }

  handleEdit(expense) {
    const ul = this.listComp.getElement().querySelector('#expense-list');
    const li = ul.querySelector(`li[data-id="${expense.id}"]`);
    if (!li) return;

    const editComp = new EditExpenseComponent(expense, {
      onSave: (updated) => {
        this.model.updateExpense(updated);
      },
      onCancel: () => {
        this.renderExpenses();
      }
    });

    const editElement = editComp.getElement();
    ul.replaceChild(editElement, li);
  }

  handleFilterChange(category) {
    this.currentFilter = category;
    this.renderExpenses();
  }
}