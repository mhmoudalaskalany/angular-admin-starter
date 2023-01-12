import { Injectable } from '@angular/core';
import { HttpService } from 'app/modules/core/services/http/http.service';
import { Measure } from '../../interfaces/lookups/lookups';

@Injectable({
  providedIn: 'root'
})
export class MeasuresService extends HttpService {

  protected get baseUrl(): string {
    return 'UnitsOfMeasures/';
  }

  getMeasure(id: string) {
    return this.get<Measure>({ APIName: `Get/${id}` });
  }

  get measures() {
    return this.get<Measure[]>({ APIName: 'GetAll' });
  }

  add(body: Measure) {
    return this.post<Measure>({ APIName: 'Add', body, showAlert: true });
  }

  update(body: Measure) {
    return this.put({ APIName: 'Update', body, showAlert: true });
  }

  remove(id: string) {
    return this.delete({ APIName: `DeleteSoft/${id}`, showAlert: true });
  }
}
