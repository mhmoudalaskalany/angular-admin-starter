import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() form!: UntypedFormGroup;
  @Input() pageType!: string;

  constructor() { }

  ngOnInit(): void { }
}
