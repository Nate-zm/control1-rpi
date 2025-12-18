import { createElement } from "../framework/render.js";

function createHeaderTemplate() {
  return `
    <div class="container">
      <h1>Учет расходов</h1>
    </div>
  `;
}

export default class HeaderComponent {
  getTemplate() { 
    return createHeaderTemplate(); 
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