
import { OnInit, Directive } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { AlertService } from 'core/services/alert/alert.service';
import { Shell } from './shell';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { ExportExcelService } from 'shared/services/export-excel/export-excel.service';




@Directive()
export abstract class BaseComponent implements OnInit {

  title = '';
  pageType = '';

  abstract get service(): HttpService;
  get alert(): AlertService { return Shell.Injector.get(AlertService); }
  get route(): Router { return Shell.Injector.get(Router); }

  get excel(): ExportExcelService { return Shell.Injector.get(ExportExcelService); }
  get localize(): TranslationService { return Shell.Injector.get(TranslationService); }

  constructor(private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.title = this.activatedRoute.snapshot.data['title'];
    this.pageType = this.activatedRoute.snapshot.data['pageType'];
  }






}
