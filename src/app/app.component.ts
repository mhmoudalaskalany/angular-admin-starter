import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { TranslationService } from './modules/core/services/translation/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  show = false;
  private destroy$ = new Subject<boolean>();

  constructor(private translateService: TranslationService, private titleService: Title) { }

  ngOnInit(): void {
    this.setTitle();
  }

  setTitle(): void {
    if (this.translateService.isEnglish) {
      this.titleService.setTitle('AdminStarter');
    } else {
      this.titleService.setTitle('AdminStarter');
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
