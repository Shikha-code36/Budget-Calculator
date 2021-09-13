import { Component, OnInit } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  budgetItems: BudgetItem[] = [];
  totalBudget: number = 0;
  isSaved: Boolean = false;

  constructor() { }

  addItem(newItem: BudgetItem) {
    this.budgetItems.push(newItem);
    this.totalBudget += +newItem.amount;
  }

  deleteItem(budgetItem: BudgetItem) {
    const index = this.budgetItems.indexOf(budgetItem);
    this.budgetItems.splice(index, 1);
    this.totalBudget -= +budgetItem.amount;
  }

  updateBudgetItem(updatedItem) {
    const { oldItem, newItem } = updatedItem;
    if (oldItem.amount === newItem.amount && oldItem.description === newItem.description) {
      return;
    }
    const index = this.budgetItems.indexOf(oldItem);
    this.budgetItems[index] = newItem;
    this.totalBudget -= +oldItem.amount;
    this.totalBudget += +newItem.amount;
  }

  saveToLocal() {
    if (this.budgetItems.length) {
      this.isSaved = true;
      setTimeout(() => {
        localStorage.setItem('budgetItems', JSON.stringify(this.budgetItems));
        localStorage.setItem('totalBudget', JSON.stringify(this.totalBudget));
        this.isSaved = false;
      }, 2000);
    }
  }

  checkLocalStorage() {
    try {
      const budgetItems = JSON.parse(localStorage.getItem('budgetItems'));
      const totalBudget = JSON.parse(localStorage.getItem('totalBudget'));
      if (budgetItems && totalBudget) {
        this.budgetItems = budgetItems;
        this.totalBudget = totalBudget;
      }
    }
    catch (err) {
      console.log(err.message);
    }
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

}
