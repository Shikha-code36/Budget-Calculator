import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetItem } from '../shared/models/budget-item.model';

@Component({
  selector: 'app-add-item-form',
  templateUrl: './add-item-form.component.html',
  styleUrls: ['./add-item-form.component.scss']
})
export class AddItemFormComponent implements OnInit {

  formGroup: FormGroup;
  @Input() item: BudgetItem;
  isEditable: Boolean = false;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.initForms();
    this.editForm();
  }

  // Get formGroup
  get form() {
    return this.formGroup.controls;
  }

  initForms() {
    this.formGroup = new FormGroup({
      'amount': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required])
    });
  }

  editForm() {
    if (!this.item) {
      this.isEditable = false;
    }
    else {
      console.log(this.item);
      this.formGroup.get('amount').setValue(this.item.amount);
      this.formGroup.get('description').setValue(this.item.description);
      this.isEditable = true;
    }
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    if (this.item) {
      const updateValue = {
        oldItem: this.item,
        newItem: this.formGroup.value
      }
      this.formSubmit.emit(updateValue);
      this.item = null;
    }
    else {
      this.formSubmit.emit(this.formGroup.value);
      this.formGroup.reset();
    }
  }

}
