import { createElement } from "../framework/render.js";

function createFilterTemplate() {
  return `
    <div class="container expense-filter">
      <label for="category-filter">Фильтр по категориям:</label>
      <select id="category-filter" class="category-filter">
        <option value="all">Все</option>
        <option value="Food">Еда</option>
        <option value="Transport">Транспорт</option>
        <option value="Entertainment">Развлечения</option>
        <option value="Other">Другое</option>
      </select>
    </div>
  `;
}

export default class FilterComponent {
  constructor(onChange) {
    this.onChange = onChange;
  }

  getTemplate() { 
    return createFilterTemplate(); 
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this._setHandlers();
    }
    return this.element;
  }

  _setHandlers() {
    this.element.querySelector('.category-filter').addEventListener('change', (evt) => {
      this.onChange?.(evt.target.value);
    });
  }

  removeElement() { 
    this.element = null; 
  }
}