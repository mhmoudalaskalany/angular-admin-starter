import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private appConfig: any;
  private configFile: any;

  constructor(private http: HttpClient) {
    this.getConfigFileName();
  }

  loadAppConfig() {
    return this.http
      .get('assets/config/' + this.configFile)
      .toPromise()
      .then((data) => {
        this.appConfig = data;
      });
  }
  getConfigFileName(): void {
    if (environment.state === 'development') {
      this.configFile = 'development.json';
    }
    if (environment.state === 'production') {
      this.configFile = 'production.json';
    }
    if (environment.state === 'stage') {
      this.configFile = 'staging.json';
    }
  }

  getServerUrl(): string {
    return this.appConfig.HOST_API;
  }
  getAppUrl(key: any): any {
    return this.appConfig[key];
  }
}
