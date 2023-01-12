import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';

interface AddCart {
  cartId?: string;
  productId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService extends HttpService {

  protected get baseUrl(): string {
    return 'Carts/';
  }

  getCartProducts(id: string) {
    return this.get<any>({ APIName: `GetCartProducts/${id}` });
  }

  get carts() {
    return this.get<any>({ APIName: 'GetCart' });
  }

  add(body: AddCart) {
    return this.post<any>({ APIName: 'AddProductToCart', body, showAlert: true });
  }

  update(body: Partial<any>) {
    return this.put({ APIName: 'UpdateCartProduct', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `RemoveProductFromCart`, params: { id }, showAlert: true });
  }

  removeCartProducts(cartId: string) {
    return this.delete({ APIName: `RemoveCartProducts`, params: { cartId }, showAlert: false });
  }
}
