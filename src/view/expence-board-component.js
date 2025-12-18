import { createElement } from "../framework/render.js";

function createBoardTemplate() {
  return `<section class="expense-board"></section>`;
}

export default class ExpenseBoardComponent {
  getTemplate() { return createBoardTemplate(); }

  getElement() {
    if (!this.element) this.element = createElement(this.getTemplate());
    return this.element;
  }

  removeElement() { this.element = null; }
}
