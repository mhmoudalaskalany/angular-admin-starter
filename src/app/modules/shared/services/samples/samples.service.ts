import { Injectable } from '@angular/core';
import { HttpService } from 'core/services/http/http.service';
import { SampleDto, AddSampleDto, UpdateSampleDto } from 'shared/interfaces/sample/sample';

@Injectable({
  providedIn: 'root'
})
export class SamplesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/samples/';
  }

  getSample(id: string) {
    return this.get<SampleDto>({ apiName: `Get/${id}` });
  }

  getEditSample(id: string) {
    return this.get<SampleDto>({ apiName: `getEdit/${id}` });
  }

  get categories() {
    return this.get<SampleDto[]>({ apiName: 'getAll' });
  }

  add(body: AddSampleDto) {
    return this.post<AddSampleDto, SampleDto>({ apiName: 'add', showAlert: true }, body);
  }

  update(body: UpdateSampleDto) {
    return this.put({ apiName: 'update', showAlert: true }, body);
  }

  remove(id: string) {
    return this.delete({ apiName: `deleteSoft/`, showAlert: true }, id);
  }
}
