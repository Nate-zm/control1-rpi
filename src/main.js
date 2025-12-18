import ExpenseModel from "./model/expence-model.js";
import ExpensePresenter from "./presenter/expence-presenter.js";

const headerContainer = document.querySelector('.app header');
const formContainer = document.querySelector('.form-container');
const boardContainer = document.querySelector('.task-board');

const model = new ExpenseModel();

const presenter = new ExpensePresenter({
  headerContainer,
  formContainer,
  boardContainer,
  model
});

presenter.init();
 