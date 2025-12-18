import { createElement } from "../framework/render.js";

function createEditTemplate(expense) {
  return `
    <li class="expense-item edit" data-id="${expense.id}">
      <form class="edit-expense-form">
        <input type="text" name="title" value="${expense.title}" required placeholder="Наименование" />
        <input type="number" name="amount" value="${expense.amount}" required placeholder="Сумма" />
        <select name="category" required>
          <option value="Food" ${expense.category === 'Food' ? 'selected' : ''}>Еда</option>
          <option value="Transport" ${expense.category === 'Transport' ? 'selected' : ''}>Транспорт</option>
          <option value="Entertainment" ${expense.category === 'Entertainment' ? 'selected' : ''}>Развлечения</option>
          <option value="Other" ${expense.category === 'Other' ? 'selected' : ''}>Другое</option>
        </select>
        <div class="edit-actions">
          <button type="submit" class="save-btn">Сохранить</button>
          <button type="button" class="cancel-btn">Отмена</button>
        </div>
      </form>
    </li>
  `;
}

export default class EditExpenseComponent {
  constructor(expense, { onSave, onCancel }) {
    this.expense = expense;
    this.onSave = onSave;
    this.onCancel = onCancel;
  }

  getTemplate() { 
    return createEditTemplate(this.expense); 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this._setHandlers();
    }
    return this.element;
  }

  _setHandlers() {
    const form = this.element.querySelector('.edit-expense-form');

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const fd = new FormData(form);
      const updated = { 
        id: this.expense.id,
        title: fd.get('title').trim(),
        amount: parseInt(fd.get('amount')),
        category: fd.get('category')
      };
      
      if (!updated.title || !updated.amount || !updated.category) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      this.onSave?.(updated);
    });

    this.element.querySelector('.cancel-btn').addEventListener('click', () => {
      this.onCancel?.();
    });
  }

  removeElement() { 
    this.element = null; 
  }
}