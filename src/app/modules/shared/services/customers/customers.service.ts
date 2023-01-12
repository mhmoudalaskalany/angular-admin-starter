import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Customer } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends HttpService {

  protected get baseUrl(): string {
    return 'Customers/';
  }

  getCustomer(id: string) {
    return this.get<Customer>({ APIName: `Get/${id}` });
  }

  get customers() {
    return this.get<Customer[]>({ APIName: 'GetAll' });
  }

  add(body: Customer) {
    return this.post<Customer>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Customer) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
