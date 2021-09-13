import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from '../shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})
export class BudgetItemListComponent implements OnInit {

  isIncomeValue: Boolean = true;
  @Input() budgetItems: BudgetItem[] = [];
  @Output() deleteBudget: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() updatedBudget: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteItem(budgetItem: BudgetItem) {
    this.deleteBudget.emit(budgetItem);
  }

  updateBudget(updatedItems) {
    this.updatedBudget.emit(updatedItems);
  }

}
