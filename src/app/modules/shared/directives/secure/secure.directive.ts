import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'app/modules/core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[secure]'
})
export class SecureDirective {

  permissionsSubscription!: Subscription;

  @Input('secure') permissions: string[] | undefined = [];

  constructor(public authService: AuthService, private eltRef: ElementRef) { }

  ngOnInit() {
    this.permissionsSubscription = this.authService.userPermissions$.subscribe(userPermissions => {
      const permissionsCodes = userPermissions.map(permission => permission.code);

      if (userPermissions?.length) {
        const allow = this.permissions ? this.permissions.some(x => permissionsCodes.includes(x)) : false;
        this.applyPermissions(allow);
      } else {
        this.applyPermissions(false);
      }
    });
  }

  applyPermissions(allow: boolean) {
    const el: HTMLElement = this.eltRef.nativeElement;
    if (!allow) {
      el.remove();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.permissionsSubscription.unsubscribe();
  }
}
