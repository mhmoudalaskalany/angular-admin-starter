import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'core/services/translation/translation.service';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  pageType = '';
  isEnglish = true;
  form!: FormGroup;

  constructor(private translateService: TranslationService, private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private account: AccountService) { }

  ngOnInit(): void {
    this.pageType = this.activatedRoute.snapshot.data['type'];
    this.initForm();
  }

  /**
   * Init Form
   */
  initForm() {
    switch (this.pageType) {
      case 'SIGNIN':
        this.form = this.fb.group({
          username: ['admin', [Validators.required]],
          password: ['123456', [Validators.required]]
        });

        break;
      case 'SIGNUP':
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.min(8)]],
        });

        break;
      case 'FORGET_PASSWORD':
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          phone: [{ value: '', disabled: true }, [Validators.required]],
          type: [1]
        });

        break;
      case 'COMPLETE_SIGNUP':
        this.form = this.fb.group({
          nameEn: ['', [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
          email: [{ value: JSON.parse(localStorage.getItem('userData') as string).email, disabled: true }, [Validators.required, Validators.email]],
          phone: [{ value: JSON.parse(localStorage.getItem('userData') as string).phone, disabled: true }, [Validators.required, Validators.min(8)]],
          otp: ['', [Validators.required]]
        }, {
          validators: this.mustMatch('password', 'confirmPassword')
        });

        break;
      default:
        break;
    }
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPassword: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * Login 
   */
  login() {
    this.account.login(this.form.value).subscribe(user => {
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', this.account.convertTokenJWT().UserId);
  
        if (this.activatedRoute.snapshot.paramMap.get('redirect')) {
          this.router.navigate([this.activatedRoute.snapshot.paramMap.get('redirect')]);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }
    });
  }

  changeLanguage() {
    this.translateService.changeLanguage();
  }
}
