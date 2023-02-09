import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { Category } from 'shared/interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/categories/';
  }

  getCategory(id: string) {
    return this.get<Category>({ apiName: `get/${id}` });
  }

  getEditCategory(id: string) {
    return this.get<Category>({ apiName: `getEdit/${id}` });
  }

  get categories() {
    return this.get<Category[]>({ apiName: 'getAll' });
  }

  add(body: Category) {
    return this.post<Category, Category>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: Category) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `deleteSoft/`, showAlert: true }, id);
  }
}
