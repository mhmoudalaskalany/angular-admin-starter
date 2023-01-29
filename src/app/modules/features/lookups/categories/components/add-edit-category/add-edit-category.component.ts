import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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
  lookupId = '';
  lookupFormGroup!: FormGroup;
  categories: Category[] = [];
  shops: Shop[] = [];

  constructor(private dialogRef: MatDialogRef<AddEditCategoryComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: FormBuilder, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.pageType = this.data.activatedRoute.snapshot.firstChild?.data['pageType'];
    this.lookupId = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('id') as string;

    this.initFormGroup();
    this.getLookups();
  }

  initFormGroup() {
    this.lookupFormGroup = this.fb.group({
      description: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      code: ['', Validators.required],
      shopId: [null, Validators.required],
      parentId: [null]
    });

    if (this.pageType === 'edit') {
      this.getLookup();
    }
  }

  getLookups() {
    this.categoriesService.categories.subscribe((lookups: any) => {
      this.categories = lookups[0].filter((category: any) => this.lookupId ? ![category.id, category.parentId].includes(this.lookupId) : category);

    });
  }

  getLookup() {
    this.categoriesService.getCategory(this.lookupId).subscribe((category: any) => this.lookupFormGroup.patchValue(category));
  }

  submit() {
    if (this.pageType === 'add') this.categoriesService.add(this.lookupFormGroup.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit') this.categoriesService.update({ id: this.lookupId, ...this.lookupFormGroup.value }).subscribe(() => this.dialogRef.close());
  }
}
