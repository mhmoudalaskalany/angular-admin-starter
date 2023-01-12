import { Injectable } from '@angular/core';
import { HttpService, HttpServiceBaseCRUD } from 'app/modules/core/services/http/http.service';
import { Transaction } from '../../interfaces/transaction/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends HttpService implements HttpServiceBaseCRUD {

  protected get baseUrl(): string {
    return 'Transactions/';
  }

  getTransaction(id: string) {
    return this.get<Transaction>({ APIName: `Get/${id}` });
  }

  add(body: Partial<Transaction>) {
    return this.post<Transaction>({ APIName: 'AddTransaction', body, showAlert: true });
  }

  update(body: Partial<Transaction>) {
    return this.put({ APIName: 'UpdateTransaction', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `Delete/${id}`, showAlert: true });
  }
}
