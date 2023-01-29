import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'core/services/alert/alert.service';
import { HttpService } from 'core/services/http/http.service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'shared/interfaces/response/response';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends HttpService {

  constructor(http: HttpClient, private translate: TranslateService) {
    super(http);
  }

  protected get baseUrl(): string {
    return 'Accounts/';
  }

  login(body: any): Observable<any> {
    return this.post<any, ApiResponse<boolean>>({ apiName: 'Login' }, body).pipe(map(result => {
      if (result) {
        this.alertService.success(this.translate.instant('Validation.LoginSuccess'));
      } else {
        this.alertService.error(this.translate.instant('Validation.WrongUserOrPass'));
      }

      return result;
    }));
  }
}
