import { createElement } from "../framework/render.js";

function createExpenseTemplate(expense) {
  return `
    <li class="expense-item" data-id="${expense.id}">
      <div class="expense-details">
        <strong class="expense-title">${expense.title}</strong>
        <span class="expense-amount">Сумма: ${expense.amount} руб.</span>
        <span class="expense-category">Категория: ${getCategoryName(expense.category)}</span>
      </div>
      <div class="expense-actions">
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn">Удалить</button>
      </div>
    </li>
  `;
}

function getCategoryName(category) {
  const categories = {
    'Food': 'Еда',
    'Transport': 'Транспорт',
    'Entertainment': 'Развлечения',
    'Other': 'Другое'
  };
  return categories[category] || category;
}

export default class ExpenseComponent {
  constructor(expense, { onEdit, onDelete }) {
    this.expense = expense;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  getTemplate() { 
    return createExpenseTemplate(this.expense); 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this._setHandlers();
    }
    return this.element;
  }

  _setHandlers() {
    this.element.querySelector('.delete-btn').addEventListener('click', () => {
      this.onDelete?.(this.expense.id);
    });

    this.element.querySelector('.edit-btn').addEventListener('click', () => {
      this.onEdit?.(this.expense);
    });
  }

  removeElement() { 
    this.element = null; 
  }
}