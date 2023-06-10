import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Shell } from 'base/components/shell';

import { Category, Shop } from 'shared/interfaces/lookups/lookups';
import { CategoriesService } from 'shared/services/categories/categories.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  pageTitle = '';
  pageType = '';
  id = '';
  form!: FormGroup;
  categories: Category[] = [];
  get categoriesService(): CategoriesService {
    return Shell.Injector.get(CategoriesService);
  }
  get fb(): FormBuilder {
    return Shell.Injector.get(FormBuilder);
  }
  constructor(
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute }
  ) {}

  ngOnInit(): void {
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.pageType = this.data.activatedRoute.snapshot.firstChild?.data['pageType'];
    this.id = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('id') as string;

    this.initFormGroup();
    this.getLookups();
  }

  initFormGroup() {
    this.form = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      code: ['', Validators.required],
      parentId: [null]
    });

    if (this.pageType === 'edit') {
      this.getLookup();
    }
  }

  getLookups() {
    this.categoriesService.categories.subscribe((categories: any) => {
      this.categories = categories;
    });
  }

  getLookup() {
    this.categoriesService.getEditCategory(this.id).subscribe((category: any) => this.form.patchValue(category));
  }

  submit() {
    if (this.pageType === 'add') this.categoriesService.add(this.form.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit')
      this.categoriesService.update({ id: this.id, ...this.form.value }).subscribe(() => this.dialogRef.close());
  }
}
