import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() label = '';
  @Input() color = 'bg-primary';
  @Input() checked = false;
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';

  @Output() isChecked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if (this.formGroup) this.checked = this.formGroup.get(this.controlName)?.value;
  }

  whenChecked(event: MatCheckboxChange) {
    if (this.formGroup) this.formGroup.get(this.controlName)?.setValue(event.checked);
    this.checked = event.checked;
    this.isChecked.emit(event.checked);
  }
}
