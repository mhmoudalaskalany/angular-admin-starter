import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
import { API_Response } from '../../interfaces/response/response';
import { AlertService } from '../alert/alert.service';

abstract class HttpServiceBaseService {
  protected abstract get baseUrl(): string;
}

export declare interface HttpServiceBaseCRUD {
  add(body: Partial<any>): Observable<any>;
  update(body: Partial<any>): Observable<any>;
  remove(id: string): Observable<any>;
}

interface URL_Config {
  APIName: string,
  body?: any,
  params?: { [header: string]: string | string[]; },
  showAlert?: boolean;
}

interface UpdateResponse {
  data: null;
  status: number;
  message: string;
  exception: null;
}

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService extends HttpServiceBaseService {

  private domainName = environment.HOST_API;
  
  constructor(private http: HttpClient, public alertService: AlertService) { super(); }
  
  get<T>(URL_Config: URL_Config) {
    return this.http.get<API_Response<T>>(`${this.domainName}${this.baseUrl}${URL_Config.APIName}`, { params: URL_Config.params }).pipe(map(event => {
      return event.data;
    }));
  }

  post<T>(URL_Config: URL_Config) {
    return this.http.post<API_Response<T>>(`${this.domainName}${this.baseUrl}${URL_Config.APIName}`, URL_Config.body, { params: URL_Config.params }).pipe(map(event => {
      URL_Config.showAlert ? this.alertHandling(event) : '';
      return event.data;
    }));
  }

  put(URL_Config: URL_Config): Observable<UpdateResponse> {
    return this.http.put<API_Response<UpdateResponse>>(`${this.domainName}${this.baseUrl}${URL_Config.APIName}`, URL_Config.body, { params: URL_Config.params }).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));
  }

  delete(URL_Config: URL_Config): Observable<boolean> {
    return this.http.delete<API_Response<boolean>>(`${this.domainName}${this.baseUrl}${URL_Config.APIName}`, { body: URL_Config.body, params: URL_Config.params }).pipe(map((event: any) => {
      this.alertHandling(event);
      return event.data;
    }));
  }

  private alertHandling(event: API_Response<any>) {
    if (event.status) {
      if (event.status.toString().startsWith('2')) {
        this.alertService.success(event.message ? event.message : 'Successfully Done...');
      } else {
        this.alertService.error(event.message ? event.message : '!NOT HANDLED ERROR!');
      }
    }
  }

  convertTokenJWT(token = localStorage.getItem('token') as string) {
    if (token) {
      let base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'),
        jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

      return JSON.parse(jsonPayload);
    }
  }
}
