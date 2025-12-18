import { createElement } from "../framework/render.js";

function createFormTemplate() {
  return `
    <div class="container expense-form">
      <h2>Добавить расходы</h2>
      <form class="add-expense-form">
        <input type="text" name="title" placeholder="Наименование расхода" required />
        <input type="number" name="amount" placeholder="Сумма" required />
        
        <fieldset>
          <legend>Категория:</legend>
          <label><input type="radio" name="category" value="Food" required /> Еда</label>
          <label><input type="radio" name="category" value="Transport" /> Транспорт</label>
          <label><input type="radio" name="category" value="Entertainment" /> Развлечения</label>
          <label><input type="radio" name="category" value="Other" /> Другое</label>
        </fieldset>

        <button type="submit">Добавить расходы</button>
      </form>
    </div>
  `;
}

export default class FormAddExpenseComponent {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
  }

  getTemplate() { 
    return createFormTemplate(); 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this._setHandlers();
    }
    return this.element;
  }

  _setHandlers() {
    const form = this.element.querySelector('.add-expense-form');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const fd = new FormData(form);
      const newExpense = {
        title: fd.get('title').trim(),
        amount: parseInt(fd.get('amount')),
        category: fd.get('category')
      };
      
      if (!newExpense.title || !newExpense.amount || !newExpense.category) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      this.onSubmit?.(newExpense);
      form.reset();
    });
  }

  removeElement() { 
    this.element = null; 
  }
}