import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Shop } from 'shared/interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class ShopsService extends HttpService {

  protected get baseUrl(): string {
    return 'Shops/';
  }

  getShop(id: string) {
    return this.get<Shop>({ APIName: `Get/${id}` });
  }

  get shops() {
    return this.get<Shop[]>({ APIName: 'GetAll' });
  }

  add(body: Shop) {
    return this.post<Shop>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Shop) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
