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
    return this.get<Category>({ apiName: `Get/${id}` });
  }

  get categories() {
    return this.get<Category[]>({ apiName: 'GetAll' });
  }

  add(body: Category) {
    return this.post<Category, Category>({ apiName: 'Add' }, body);
  }

  update(body: Category) {
    return this.put({ apiName: 'Update' }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `DeleteSoft/` }, id);
  }
}
