import { Injectable } from '@angular/core';
import { GetPagedBody, GetPagedResponse } from 'app/modules/core/interfaces/get-paged/get-paged';
import { HttpService, HttpServiceBaseCRUD } from 'app/modules/core/services/http/http.service';
import { Product } from '../../interfaces/product/product';
import { ProductPrice } from '../../interfaces/product/product-price';

interface Filter {
  id: string | null;
  code: string;
  nameEn: string;
  nameAr: string;
  quantity: number;
  expirationDate: string;
  barcode: string;
  categoryId: string | null;
  warehouseId: string | null;
  supplierId: string | null;
  unitsOfMeasureId: string | null;
  isOutOfStock: boolean;
  isLowInStock: boolean;
  isPriceApproved: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpService implements HttpServiceBaseCRUD {

  protected get baseUrl(): string {
    return 'Products/';
  }

  getProduct(id: string) {
    return this.get<Product>({ APIName: `Get/${id}` });
  }

  get products() {
    return this.get<Product[]>({ APIName: 'GetAll' });
  }

  getPaged(body: GetPagedBody<Partial<Filter>>) {
    return this.post<GetPagedResponse<Product[]>>({ APIName: 'GetPaged', body });
  }

  add(body: Partial<Product>) {
    return this.post<Product>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Partial<Product>) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }

  getBarcodePaged(body: GetPagedBody<Filter>) {
    return this.post<GetPagedResponse<Product[]>>({ APIName: 'GetBarcodePaged', body });
  }

  addUpdateProductPrice(body: Partial<ProductPrice>) {
    return this.post<Product>({ APIName: 'AddUpdateProductPrice', body, showAlert: true });
  }

  approveProductPrice(productId: string) {
    return this.put({ APIName: 'ApproveProductPrice', params: { productId }, showAlert: true });
  }
}
