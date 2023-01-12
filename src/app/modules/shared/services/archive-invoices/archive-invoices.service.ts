import { Injectable } from '@angular/core';
import { GetPagedBody, GetPagedResponse } from 'app/modules/core/interfaces/get-paged/get-paged';
import { HttpService, HttpServiceBaseCRUD } from 'app/modules/core/services/http/http.service';
import { ArchiveInvoice } from '../../interfaces/archive-invoice/archive-invoice';

@Injectable({
  providedIn: 'root'
})
export class ArchiveInvoicesService extends HttpService implements HttpServiceBaseCRUD {

  protected get baseUrl(): string {
    return 'ArchiveInvoices/';
  }

  getArchivedInvoice(id: string) {
    return this.get<ArchiveInvoice>({ APIName: `Get/${id}` });
  }

  get archivedInvoices() {
    return this.get<ArchiveInvoice[]>({ APIName: 'GetAll' });
  }

  getPaged(body: GetPagedBody<any>) {
    return this.post<GetPagedResponse<ArchiveInvoice[]>>({ APIName: 'GetInvoicesPaged', body });
  }

  add(body: Partial<ArchiveInvoice>) {
    return this.post<boolean>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Partial<ArchiveInvoice>) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
