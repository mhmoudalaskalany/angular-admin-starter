import { Injectable } from '@angular/core';
import { GetPagedBody, GetPagedResponse } from 'app/modules/core/interfaces/get-paged/get-paged';
import { HttpService, HttpServiceBaseCRUD } from 'app/modules/core/services/http/http.service';
import { DamagedProduct, DamagedProductBase } from '../../interfaces/product/damaged';

interface Filter {
  totalDamageProduct: number;
  productId: string;
}

@Injectable({
  providedIn: 'root'
})
export class DamagedProductsService extends HttpService implements HttpServiceBaseCRUD {

  protected get baseUrl(): string {
    return 'DamageProductsDetails/';
  }

  getDamagedProduct(id: string) {
    return this.get<DamagedProduct>({ APIName: `Get/${id}` });
  }

  get damagedProducts() {
    return this.get<DamagedProduct[]>({ APIName: 'GetAll' });
  }

  getPaged(body: GetPagedBody<Partial<Filter>>) {
    return this.post<GetPagedResponse<DamagedProduct[]>>({ APIName: 'GetPaged', body });
  }

  add(body: Partial<DamagedProductBase>) {
    return this.post<boolean>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Partial<DamagedProductBase>) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
