import { UrlConfig } from 'core/services/http/UrlConfig';
import { Shell } from 'base/components/shell';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApResponse } from 'shared/interfaces/response/response';
import { AlertService } from '../alert/alert.service';
import { TranslationService } from '../translation/translation.service';
import { HttpServiceBaseService } from 'base/services/http-service-base.service';
import { ConfigService } from '../config/config.service';
import { HttpStatus } from './HttpStatus';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService extends HttpServiceBaseService {

  protected domainName: string;
  get alertService(): AlertService { return Shell.Injector.get(AlertService); }
  get configService(): ConfigService { return Shell.Injector.get(ConfigService); }
  get localize(): TranslationService { return Shell.Injector.get(TranslationService); }
  constructor(protected http: HttpClient) {
    super();
    this.domainName = this.configService.getAppUrl('HOST_API');
  }

  get<T>(URL_Config: UrlConfig): Observable<T> {
    return this.http.get<ApResponse<T>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params }).pipe(map(event => {
      return event.data;
    }));
  }

  getAll<T>(URL_Config: UrlConfig): Observable<T[]> {
    return this.http.get<ApResponse<T[]>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params }).pipe(map(event => {
      return event.data;
    }));
  }

  postFilter<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http.post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(map(event => {
      URL_Config.showAlert ? this.alertHandling(event) : '';
      return event.data;
    }));
  }

  post<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http.post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(map(event => {
      URL_Config.showAlert ? this.alertHandling(event) : '';
      return event.data;
    }));
  }

  postRange<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http.post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(map(event => {
      URL_Config.showAlert ? this.alertHandling(event) : '';
      return event.data;
    }));
  }

  put<T, D>(URL_Config: UrlConfig, body: T): Observable<T> {
    return this.http.put<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));
  }

  delete(URL_Config: UrlConfig, id: any): Observable<boolean> {
    return this.http.delete<ApResponse<boolean>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { body: id, params: URL_Config.params }).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));
  }

  private alertHandling(event: ApResponse<any>) {
    if (event.status) {
      if (!Number.isNaN(Number(event.status))) {
        if (event.status.toString().startsWith('2')) {
          this.alertService.success(event.message ? this.localize.translate.instant('Validation.' + event.message) : 'Successfully Done...');
        } else {
          this.alertService.error(event.message ? this.localize.translate.instant('Validation.' + event.message) : '!NOT HANDLED ERROR!');
        }
      } else {
        const status = event.status.toString();
        switch (status) {
          case HttpStatus.Created: {
            this.alertService.success(event.message ? this.localize.translate.instant('Validation.' + event.message) : 'Successfully Done...');
            break;
          }
          case HttpStatus.Accepted: {
            this.alertService.success(event.message ? this.localize.translate.instant('Validation.' + event.message) : 'Successfully Done...');
            break;
          }
          case HttpStatus.NoContent: {
            this.alertService.success(event.message ? this.localize.translate.instant('Validation.' + event.message) : 'Successfully Done...');
            break;
          }
          case HttpStatus.BadRequest: {
            this.alertService.error(event.message ? this.localize.translate.instant('Validation.' + event.message) : '!NOT HANDLED ERROR!');
            break;
          }
          case HttpStatus.InternalServerError: {
            this.alertService.error(event.message ? this.localize.translate.instant('Validation.' + event.message) : this.localize.translate.instant('Validation.InternalServerError'));
            break;
          }
          case HttpStatus.Ok: {
            break;
          }
          default: {
            this.alertService.error(event.message ? this.localize.translate.instant('Validation.' + event.message) : '!NOT HANDLED ERROR!');
          }
        }

      }
    }
  }
}

