import { Component, Inject, OnInit, Optional } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from 'app/modules/shared/services/user-management/permissions/permissions.service';

@Component({
  selector: 'app-add-edit-permission',
  templateUrl: './add-edit-permission.component.html',
  styleUrls: ['./add-edit-permission.component.scss']
})
export class AddEditPermissionComponent implements OnInit {

  pageTitle = '';
  pageType = '';
  lookupId = '';
  lookupFormGroup!: UntypedFormGroup;

  constructor(private dialogRef: MatDialogRef<AddEditPermissionComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: UntypedFormBuilder, private permissionsService: PermissionsService) { }

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
    this.permissionsService.getPermission(this.lookupId).subscribe(permission => this.lookupFormGroup.patchValue(permission));
  }

  submit() {
    if (this.pageType === 'add') this.permissionsService.add(this.lookupFormGroup.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit') this.permissionsService.update({ id: this.lookupId, ...this.lookupFormGroup.value }).subscribe(() => this.dialogRef.close());
  }
}
