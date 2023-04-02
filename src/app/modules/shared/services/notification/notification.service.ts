import { Injectable } from '@angular/core';
import { Shell } from 'base/components/shell';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { HttpService } from 'core/services/http/http.service';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends HttpService {
  notification: any = {};
  connection: signalR.HubConnection;
  connectionEstablished = new signalR.Subject<boolean>();
  notifications: any[] = [];
  notificationCounter = 0;

  get baseUrl(): string {
    return 'notifications/';
  }
  get storageService(): StorageService {
    return Shell.Injector.get(StorageService);
  }

  connect(): void {
    this.startConnection();
  }
  /**
   * Public Methods
   */
  startConnection = () => {
    const serverUrl = this.configService.getAppUrl('HUB_URL');
    const delays: number[] = this.getDelays();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(serverUrl + 'hubs/realestatehub', {
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => this.storageService.getToken()
      })
      .withAutomaticReconnect(delays)
      .build();
    this.connection
      .start()
      .then(() => {
        this.AddListeners();
      })
      .catch(err => {
        console.log(`Error while starting connection:  ${err}`);
      });
  };

  getAllNotifications(): void {
    this.get('GetAll').subscribe((res: any) => {
      this.notifications = [];
      this.notifications = res.data;
    });
  }

  disconnect(): void {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }

  getCount(): void {
    this.getReq('GetCount').subscribe((res: any) => {
      this.notificationCounter = res.data;
    });
  }

  setIsRead(notificationId: any): Observable<any> {
    return this.getReq('SetIsRead/' + notificationId);
  }

  /**
   * Private Methods
   */
  private AddListeners(): void {
    this.connection.on('NewNotification', (data: any) => {
      const notification = JSON.parse(data);
      this.alertService.success(this.localize.isEnglish ? notification?.TitleEn : notification?.TitleAr);
      this.getCount();
      this.getAllNotifications();
    });
    this.connection.onreconnected(() => {
      this.getCount();
      this.getAllNotifications();
    });
    // this.connection.onclose(() => {
    //   setTimeout(() => {
    //     this.connect();
    //   }, 60000);
    // });
  }

  getDelays(): number[] {
    const intervals = this.configService.getAppUrl('SIGNAL-R-INTERVALS');
    const interval = this.configService.getAppUrl('SIGNAL-R-INTERVAL');
    const retriesNumber = +intervals;
    const numbers: number[] = [];
    let initValue = 0;
    numbers.push(initValue);
    for (let i = 0; i <= retriesNumber; i++) {
      initValue = initValue + +interval;
      numbers.push(initValue);
    }
    return numbers;
  }
}
