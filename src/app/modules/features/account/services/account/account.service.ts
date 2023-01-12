import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { API_Response } from 'core/interfaces/response/response';
import { AlertService } from 'core/services/alert/alert.service';
import { HttpService } from 'core/services/http/http.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {

  constructor(http: HttpClient, alertService: AlertService, private translate: TranslateService) {
    super(http, alertService);
  }

  protected get baseUrl(): string {
    return 'Accounts/';
  }

  login(body: any): Observable<any> {
    return this.post<API_Response<boolean>>({ APIName: 'Login', body, showAlert: false }).pipe(map(result => {
      if (result) {
        this.alertService.success(this.translate.instant('Validation.LoginSuccess'));
      } else {
        this.alertService.error(this.translate.instant('Validation.WrongUserOrPass'));
      }

      return result;
    }));
  }
}
