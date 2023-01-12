import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { Category, Shop } from 'app/modules/shared/interfaces/lookups/lookups';
import { CategoriesService } from 'app/modules/shared/services/categories/categories.service';
import { ShopsService } from 'app/modules/shared/services/shops/shops.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {

  pageTitle = '';
  pageType = '';
  lookupId = '';
  lookupFormGroup!: UntypedFormGroup;
  categories: Category[] = [];
  shops: Shop[] = [];

  constructor(private dialogRef: MatDialogRef<AddEditCategoryComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: UntypedFormBuilder, private categoriesService: CategoriesService, private shopsService: ShopsService) { }

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
    combineLatest(this.categoriesService.categories, this.shopsService.shops).subscribe(lookups => {
      this.categories = lookups[0].filter(category => this.lookupId ? ![category.id, category.parentId].includes(this.lookupId) : category);
      this.shops = lookups[1];
    });
  }

  getLookup() {
    this.categoriesService.getCategory(this.lookupId).subscribe(category => this.lookupFormGroup.patchValue(category));
  }

  submit() {
    if (this.pageType === 'add') this.categoriesService.add(this.lookupFormGroup.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit') this.categoriesService.update({ id: this.lookupId, ...this.lookupFormGroup.value }).subscribe(() => this.dialogRef.close());
  }
}
