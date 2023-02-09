import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { AddCategoryDto, CategoryDto, UpdateCategoryDto } from 'shared/interfaces/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/categories/';
  }

  getCategory(id: string) {
    return this.get<CategoryDto>({ apiName: `Get/${id}` });
  }

  getEditCategory(id: string) {
    return this.get<CategoryDto>({ apiName: `getEdit/${id}` });
  }

  get categories() {
    return this.get<CategoryDto[]>({ apiName: 'getAll' });
  }

  add(body: AddCategoryDto) {
    return this.post<AddCategoryDto, CategoryDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateCategoryDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `deleteSoft/`, showAlert: true }, id);
  }
}
