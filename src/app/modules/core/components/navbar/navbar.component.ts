import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { SidebarToggleService } from '../../services/sidebar-toggle/sidebar-toggle.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isEnglish = true;
  lang = '';
  user: any = {};
  constructor(
    public translateService: TranslationService,
    private router: Router,
    private sidebarService: SidebarToggleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.translateService.currentLanguage$.subscribe(lang => (this.lang = lang));
    this.getUserData();
  }

  sidebarToggle = () => {
    this.sidebarService.toggle();
  };

  changeLanguage = () => {
    this.translateService.changeLanguage();
  };

  getUserData = () => {
    this.user = this.authService.convertTokenJWT();
  };

  logOut = () => {
    localStorage.clear();
    this.router.navigate(['/']);
  };
}
