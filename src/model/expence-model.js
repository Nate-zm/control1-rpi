import { expenses } from '../mock/expenses.js';
import generateID from '../utils.js';

export default class ExpenseModel {
  #expenses = [...expenses];
  #observers = [];

  getExpenses() {
    return [...this.#expenses];
  }

  addExpense(expense) {
    const newExpense = { 
      ...expense, 
      id: generateID() 
    };
    this.#expenses.push(newExpense);
    this._notifyObservers();
  }

  deleteExpense(id) {
    this.#expenses = this.#expenses.filter(exp => exp.id !== id);
    this._notifyObservers();
  }

  updateExpense(updated) {
    const idx = this.#expenses.findIndex(exp => exp.id === updated.id);
    if (idx !== -1) {
      this.#expenses[idx] = { ...updated };
      this._notifyObservers();
    }
  }

  getByCategory(category) {
    if (!category || category === 'all') return this.getExpenses();
    return this.getExpenses().filter(exp => exp.category === category);
  }

  addObserver(fn) {
    this.#observers.push(fn);
  }

  removeObserver(fn) {
    this.#observers = this.#observers.filter(o => o !== fn);
  }

  _notifyObservers() {
    this.#observers.forEach(o => o());
  }
}
