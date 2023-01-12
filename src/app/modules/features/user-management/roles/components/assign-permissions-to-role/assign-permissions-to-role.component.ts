import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Role, Permission } from 'shared/interfaces/lookups/lookups';
import { PermissionsService } from 'shared/services/user-management/permissions/permissions.service';
import { RolesService } from 'shared/services/user-management/roles/roles.service';

@Component({
  selector: 'app-assign-permissions-to-role',
  templateUrl: './assign-permissions-to-role.component.html',
  styleUrls: ['./assign-permissions-to-role.component.scss']
})
export class AssignPermissionsToRoleComponent implements OnInit {

  isEnglish = false;
  role!: Role;
  roleId!: string;
  permissions: Permission[] = [];
  assignPermissionFormGroup!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AssignPermissionsToRoleComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: FormBuilder, private permissionsService: PermissionsService, private roleService: RolesService) { }

  ngOnInit(): void {
    this.roleId = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('roleId') as string;

    this.getRole();
    this.getRolePermissions();
  }

  getRole() {
    this.roleService.getRole(this.roleId).subscribe(role => this.role = role);
  }

  getRolePermissions() {
    combineLatest(this.permissionsService.permissions, this.permissionsService.getRolePermissions(this.roleId)).subscribe((permissions:any) => {
      this.permissions = permissions[0];
      const rolePermission = permissions[1];
      this.initForm(rolePermission);
    })
  }

  initForm(rolePermission: Permission[]) {
    this.assignPermissionFormGroup = this.fb.group({
      roleId: [this.roleId],
      permissionsIds: [rolePermission.length ? rolePermission.map(permission => permission.id) : null, Validators.required]
    });
  }

  submit() {
    this.permissionsService.assignPermissionToRole(this.assignPermissionFormGroup.value).subscribe(() => this.dialogRef.close())
  }
}
