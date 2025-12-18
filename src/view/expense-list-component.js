import { createElement } from "../framework/render.js";

function createListTemplate() {
  return `
    <div class="container expense-list">
      <h2>Список расходов</h2>
      <ul id="expense-list"></ul>
    </div>
  `;
}

export default class ExpenseListComponent {
  getTemplate() { 
    return createListTemplate(); 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() { 
    this.element = null; 
  }
}