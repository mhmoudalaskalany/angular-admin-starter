import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Supplier } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService extends HttpService {

  protected get baseUrl(): string {
    return 'Suppliers/';
  }

  getSupplier(id: string) {
    return this.get<Supplier>({ APIName: `Get/${id}` });
  }

  get suppliers() {
    return this.get<Supplier[]>({ APIName: 'GetAll' });
  }

  add(body: Supplier) {
    return this.post<Supplier>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Supplier) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
