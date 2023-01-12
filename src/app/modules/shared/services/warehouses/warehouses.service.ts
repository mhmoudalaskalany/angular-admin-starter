import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Warehouse } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class WarehousesService extends HttpService {

  protected get baseUrl(): string {
    return 'Warehouses/';
  }

  getWarehouse(id: string) {
    return this.get<Warehouse>({ APIName: `Get/${id}` });
  }

  get warehouses() {
    return this.get<Warehouse[]>({ APIName: 'GetAll' });
  }

  add(body: Warehouse) {
    return this.post<Warehouse>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Warehouse) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
