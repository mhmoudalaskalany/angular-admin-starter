import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Category } from 'shared/interfaces/lookups/lookups';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpService {

  protected get baseUrl(): string {
    return 'Categories/';
  }

  getCategory(id: string) {
    return this.get<Category>({ APIName: `Get/${id}` });
  }

  get categories() {
    return this.get<Category[]>({ APIName: 'GetAll' });
  }

  getAll(body: { parentId: string | null }) {
    return this.post<Category[]>({ APIName: 'GetAll', body });
  }

  add(body: Category) {
    return this.post<Category>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Category) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
