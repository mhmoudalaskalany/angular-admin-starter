import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'shared/services/user-management/roles/roles.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  pageTitle = '';
  pageType = '';
  lookupId = '';
  lookupFormGroup!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddEditRoleComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: FormBuilder, private roleService: RolesService) { }

  ngOnInit(): void {
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.pageType = this.data.activatedRoute.snapshot.firstChild?.data['pageType'];
    this.lookupId = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('id') as string;

    this.initFormGroup();
  }

  initFormGroup() {
    this.lookupFormGroup = this.fb.group({
      nameEn: ['', Validators.required],
      nameAr: ['', Validators.required],
      code: ['', Validators.required]
    });

    if (this.pageType === 'edit') {
      this.getLookup();
    }
  }

  getLookup() {
    this.roleService.getRole(this.lookupId).subscribe(role => this.lookupFormGroup.patchValue(role));
  }

  submit() {
    if (this.pageType === 'add') this.roleService.add(this.lookupFormGroup.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit') this.roleService.update({ id: this.lookupId, ...this.lookupFormGroup.value }).subscribe(() => this.dialogRef.close());
  }
}
