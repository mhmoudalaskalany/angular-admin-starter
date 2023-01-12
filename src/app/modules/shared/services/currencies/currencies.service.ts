import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Currency } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService extends HttpService {

  protected get baseUrl(): string {
    return 'Currencies/';
  }

  getCurrency(id: string) {
    return this.get<Currency>({ APIName: `Get/${id}` });
  }

  get currencies() {
    return this.get<Currency[]>({ APIName: 'GetAll' });
  }

  add(body: Currency) {
    return this.post<Currency>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Currency) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
