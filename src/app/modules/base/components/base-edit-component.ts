import { OnInit, Directive } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { FormGroup } from '@angular/forms';
import { RoleData } from 'core/guards/models';
import { BaseComponent } from './base-component';
import { UrlConfig } from 'core/services/http/UrlConfig';

@Directive()
export abstract class BaseEditComponent extends BaseComponent implements OnInit {

  model: any = {};
  form: FormGroup;
  isNew = true;
  id: string;
  role: RoleData = {};
  constructor(protected activateRoute: ActivatedRoute) {
    super(activateRoute)
  }
  protected SubmitNew(): Observable<any> {
    const configUrl: UrlConfig = {
      apiName: 'add',
    };
    return this.service.post(configUrl, this.model);
  }
  protected SubmitUpdate(): Observable<any> {
    const configUrl: UrlConfig = {
      apiName: 'update',
    };
    return this.service.put(configUrl, this.model);
  }
  protected submitReactiveNew(endpoint?: string): Observable<any> {
    const configUrl: UrlConfig = {
      apiName: endpoint != null ? endpoint : 'add',
    };
    return this.service.post(configUrl, this.form.value);
  }
  protected submitReactiveUpdate(endpoint?: string): Observable<any> {
    const configUrl: UrlConfig = {
      apiName: endpoint != null ? endpoint : 'update',
    };
    return this.service.put(configUrl, this.form.value);
  }
  protected GetModelFromServer(id: any): Observable<any> {
    const configUrl: UrlConfig = {
      apiName: 'get/' + id
    };
    return this.service.get(configUrl);
  }
  protected getUserRole(): void {
    this.role = this.manager.GetRole();
  }

  /** Submit Template Driven Form */
  Submit(): void {
    console.log(this.model);

    if (this.isNew) {
      this.SubmitNew().subscribe(
        (data: any) => {
          if (data.status !== 201) {
            this.alert.error(data.message);
            return false;
          }
          this.alert.success(
            this.localize.translate.instant('Data.AddSuccess')
          );
          this.Redirect();
        },
        (error) => {
          this.alert.error(
            this.localize.translate.instant('Data.AddError')
          );
        }
      );
    } else {
      this.SubmitUpdate().subscribe(
        (data: any) => {
          if (data.status !== 202) {
            this.alert.error(data.message);
            return false;
          }
          this.alert.success(
            this.localize.translate.instant('Data.UpdateSuccess')
          );
          this.Redirect();
        },
        (error) => {
          this.alert.error(
            this.localize.translate.instant('Data.UpdateError')
          );
          console.log('error at submitting', error);
        }
      );
    }
  }

  /** Submit Reactive  Form */
  submitReactive(endpoint?: string): void {
    if (this.isNew) {
      this.submitReactiveNew(endpoint).subscribe(
        (data: any) => {
          if (data.status !== 201) {
            this.alert.error(data.message);
            return false;
          }
          this.alert.success(
            this.localize.translate.instant('Data.AddSuccess')
          );
          this.Redirect();
        },
        (error) => {
          this.alert.error(
            this.localize.translate.instant('Data.AddError')
          );
        }
      );
    } else {
      this.submitReactiveUpdate(endpoint).subscribe(
        (data: any) => {
          if (data.status !== 202) {
            this.alert.error(data.message);
            return false;
          }
          this.alert.success(
            this.localize.translate.instant('Data.UpdateSuccess')
          );
          this.Redirect();
        },
        (error) => {
          this.alert.error(
            this.localize.translate.instant('Data.UpdateError')
          );
          console.log('error at submitting', error);
        }
      );
    }

  }

  getRouteParams() {
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.isNew = false;
      this.id = this.activateRoute.snapshot.paramMap.get('id');
      this.Get(this.id);
    }
  }

  Redirect(url?: string) {
    const currentRoute = this.route.url;
    const index = currentRoute.lastIndexOf(url ? url : '/');
    const str = currentRoute.substring(0, index);
    this.route.navigate([str]);
  }
  Get(id: any): void {
    this.GetModelFromServer(id).subscribe(
      (data: any) => {
        this.model = data.data;
        console.log(this.model);
        this.pathForm();
      },
      (error) => {
        this.alert.error(this.localize.translate.instant('Data.GetError'));
        console.log(error);

      }
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getRouteParams();
  }

  preventDefault(event) {
    event.preventDefault();
  }

  pathForm(): void {
    this.form.patchValue(this.model);
  }
}
