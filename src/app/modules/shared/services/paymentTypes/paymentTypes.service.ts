import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { PaymentType } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypesService extends HttpService {

  protected get baseUrl(): string {
    return 'PaymentTypes/';
  }

  getPaymentType(id: string) {
    return this.get<PaymentType>({ APIName: `Get/${id}` });
  }

  get paymentTypes() {
    return this.get<PaymentType[]>({ APIName: 'GetAll' });
  }

  add(body: PaymentType) {
    return this.post<PaymentType>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: PaymentType) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
