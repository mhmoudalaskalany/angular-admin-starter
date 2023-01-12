import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Role, Shop, User } from 'shared/interfaces/lookups/lookups';
import { ShopsService } from 'shared/services/shops/shops.service';
import { RolesService } from 'shared/services/user-management/roles/roles.service';
import { UsersService } from 'shared/services/user-management/users/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {

  pageTitle = '';
  pageType = '';
  user!: User;
  userId = '';
  fileDetails: any[] = [
    {
      type: "jpg",
      maxSize: 5
    },
    {
      type: "png",
      maxSize: 5
    },
    {
      type: "jpeg",
      maxSize: 5
    }
  ];
  userFormGroup!: FormGroup;
  roles: Role[] = [];
  shops: Shop[] = [];

  constructor(private dialogRef: MatDialogRef<AddEditUserComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; },
    private fb: FormBuilder, private usersService: UsersService, private roleService: RolesService, private shopsService: ShopsService) { }

  ngOnInit(): void {
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.pageType = this.data.activatedRoute.snapshot.firstChild?.data['pageType'];
    this.userId = this.data.activatedRoute.snapshot.firstChild?.paramMap.get('id') as string;
    this.getLookups();
    this.initFormGroup();
  }

  initFormGroup() {
    this.userFormGroup = this.fb.group({
      name: ['', Validators.required],
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      fileId: ['', Validators.required],
      roleIds: [null, Validators.required],
      shopId: [null, Validators.required],
      userImage: ['']
    });

    if (this.pageType === 'edit') {
      this.userFormGroup.removeControl('password');
      this.userFormGroup.removeControl('confirmPassword');
      this.getUserData();
    }
  }

  getUserData() {
    combineLatest(this.usersService.getUser(this.userId), this.usersService.getUserRoles(this.userId)).subscribe((data: any) => {
      const user = data[0];
      user.roleIds = data[1].map((role: any) => role.id) as string[];
      user.userImage = [{ ...user.userImage, url: user.imageUrl }];

      this.userFormGroup.patchValue(user);

      setTimeout(() => {
        this.user = user;
      });
    });
  }

  getLookups() {
    this.roleService.roles.subscribe((roles: any) => this.roles = roles);
    this.shopsService.shops.subscribe((shops) => this.shops = shops);
  }

  submit() {
    if (this.pageType === 'add') this.usersService.add(this.userFormGroup.value).subscribe(() => this.dialogRef.close());
    if (this.pageType === 'edit') this.usersService.update({ id: this.userId, ...this.userFormGroup.value }).subscribe(() => this.dialogRef.close());
  }
}
