import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { RolesService } from 'app/modules/shared/services/user-management/roles/roles.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
  styleUrls: ['./add-edit-role.component.scss']
})
export class AddEditRoleComponent implements OnInit {

  pageTitle = '';
  pageType = '';
  lookupId = '';
  lookupFormGroup!: UntypedFormGroup;

  constructor(private dialogRef: MatDialogRef<AddEditRoleComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: UntypedFormBuilder, private roleService: RolesService) { }

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
