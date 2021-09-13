import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BudgetItem } from 'src/app/shared/models/budget-item.model';

@Component({
  selector: 'app-budget-item-card',
  templateUrl: './budget-item-card.component.html',
  styleUrls: ['./budget-item-card.component.scss']
})
export class BudgetItemCardComponent implements OnInit {

  @Input() isIncome: Boolean = true;
  @Input() budgetItem: BudgetItem;
  @Input() index: number;
  @Output() deleteClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateItem: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modalBtn') openModal: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  isClicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cardClicked() {
    this.isClicked = true;
    this.openModal.nativeElement.click();
  }

  closeModal() {
    this.isClicked = false;
    this.closeBtn.nativeElement.click();
  }

  deleteBudgetItem() {
    this.deleteClick.emit(this.budgetItem);
  }

  onSubmitted(updatedItem) {
    this.updateItem.emit(updatedItem);
    this.closeModal();
  }

}
