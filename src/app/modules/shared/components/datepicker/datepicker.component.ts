import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class DatepickerComponent implements OnInit {

  moment = moment;
  today = moment(new Date());

  @Input() formGroup: FormGroup | any;
  @Input() controlName = '';

  @Input() minDate = '';
  @Input() maxDate = '';
  @Input() label = 'Date';

  constructor() { }

  ngOnInit(): void { }

  setDateValue(event: MatDatepickerInputEvent<any>) {
    let dateYear = +event.value.format('YYYY'),
      dateMonth = +event.value.format('MM') - 1,
      dateDay = +event.value.format('DD'),
      dateHours = +moment().locale('en').format('HH'),
      dateMinutes = +moment().locale('en').format('mm');

    const dateFormated = moment(new Date(dateYear, dateMonth, dateDay, dateHours, dateMinutes)).locale('en').utc().local().format();
    this.formGroup.get(this.controlName).setValue(dateFormated);
  }

  preventDefault(event: KeyboardEvent) {
    event.preventDefault();
  }
}
