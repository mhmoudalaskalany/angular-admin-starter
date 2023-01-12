import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// -------- Modules --------
// Angular Material Modules
import { MaterialModule } from './../material/material.module';
// Angular Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Router Mpdule
import { RouterModule } from '@angular/router';
// Translate Module
import { TranslateModule } from '@ngx-translate/core';
// NGx-Moment Module
import { MomentModule } from 'ngx-moment';

// -------- Directives --------
import { DirectivesModule } from '../../directives/directives.module';

const MODULES = [
  DirectivesModule,
  MaterialModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  TranslateModule,
  MomentModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ...MODULES
  ]
})
export class BaseSharedModule { }
