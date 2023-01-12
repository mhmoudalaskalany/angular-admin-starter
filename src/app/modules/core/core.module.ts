import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Router
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Translate Modules
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Toastr Module
import { ToastrModule } from 'ngx-toastr';

// BaseSharedModule
import { BaseSharedModule } from '../shared/sub-modules/base-shared/base-shared.module';

import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarListItemComponent } from './components/sidebar-list-item/sidebar-list-item.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarListItemComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BaseSharedModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [LoadingComponent],
  providers: [TranslateService]
})
export class CoreModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
