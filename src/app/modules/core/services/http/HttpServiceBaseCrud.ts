import { Observable } from 'rxjs';


export declare interface HttpServiceBaseCrud {
  add(body: Partial<any>): Observable<any>;
  update(body: Partial<any>): Observable<any>;
  remove(id: string): Observable<any>;
}
