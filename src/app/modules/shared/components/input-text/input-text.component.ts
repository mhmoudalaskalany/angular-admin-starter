import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyFormFieldAppearance as MatFormFieldAppearance } from '@angular/material/legacy-form-field';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {

  @Input() formGroup!: UntypedFormGroup;
  @Input() controlName = '';
  @Input() label = '';
  @Input() validatorLanguageType = '';
  @Input() inputType = 'textbox';
  @Input() contentType = 'text';
  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() readonly = false;

  constructor() { }

  ngOnInit(): void { }
}
