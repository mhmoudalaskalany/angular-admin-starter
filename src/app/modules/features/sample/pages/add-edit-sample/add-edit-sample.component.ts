import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shell } from 'base/components/shell';
import { SamplesService } from 'shared/services/samples/samples.service';

@Component({
  selector: 'app-add-edit-sample',
  templateUrl: './add-edit-sample.component.html',
  styleUrls: ['./add-edit-sample.component.scss']
})
export class AddEditSampleComponent implements OnInit {
  pageTitle = '';
  pageType = '';
  id = '';
  model: any = {};
  form!: FormGroup;
  fileDetails: any[] = [
    {
      type: 'jpg',
      maxSize: 5
    },
    {
      type: 'png',
      maxSize: 5
    },
    {
      type: 'jpeg',
      maxSize: 5
    },
    {
      type: 'pdf',
      maxSize: 25
    }
  ];
  get fb(): FormBuilder {
    return Shell.Injector.get(FormBuilder);
  }
  get router(): Router {
    return Shell.Injector.get(Router);
  }
  get samplesService(): SamplesService {
    return Shell.Injector.get(SamplesService);
  }
  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'];
    this.pageType = this.activatedRoute.snapshot.data['pageType'];
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.pageType === 'edit') {
      this.getEditSample();
    } else {
      this.initFormGroup();
      this.getLookups();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      test: ['', Validators.required],
      attachments: ['']
    });
  }

  getLookups() {}

  getEditSample() {
    this.samplesService.getEditSample(this.id).subscribe((sample: any) => {
      this.model = sample;
      this.getLookups();
    });
  }

  submit() {
    if (this.pageType === 'add')
      this.samplesService.add(this.form.value).subscribe(() => {
        this.redirect();
      });
    if (this.pageType === 'edit')
      this.samplesService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.redirect();
      });
  }

  redirect = () => {
    this.router.navigate(['/samples-management/samples']);
  };
}
