import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { SidebarToggleService } from '../../services/sidebar-toggle/sidebar-toggle.service';

interface SidebarDefault {
  label: string;
  routerLinkName: string;
  icon?: string;
  svgIcon?: string;
  permissions?: string[];
}
interface Sidebar extends SidebarDefault {
  children?: SidebarDefault[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  isSidebarOpened = false;
  sidebarItems: Sidebar[] = [
    {
      label: 'DASHBOARD.TITLE',
      icon: 'bx bxs-dashboard',
      routerLinkName: '/dashboard'
    },
    {
      label: 'SAMPLES.SAMPLES_MANAGEMENT',
      icon: 'bx bxs-user-badge',
      routerLinkName: '/samples-management',
      children: [
        {
          label: 'SAMPLES.TITLE',
          icon: 'bx bxs-user-plus',
          routerLinkName: '/samples-management/samples'
        }
      ]
    },
    {
      label: 'SETTINGS.TITLE',
      icon: 'bx bx-cog',
      routerLinkName: '/lookups',
      children: [
        {
          label: 'SETTINGS.CATEGORIES.TITLE',
          icon: 'bx bx-category',
          routerLinkName: '/lookups/categories'
        }
      ]
    },
    {
      label: 'USER_MANAGEMENT.TITLE',
      icon: 'bx bxs-user-account',
      routerLinkName: '/user-management',
      children: [
        {
          label: 'USER_MANAGEMENT.USERS.TITLE',
          icon: 'bx bx-user',
          routerLinkName: '/user-management/users'
        },
        {
          label: 'USER_MANAGEMENT.ROLES.TITLE',
          icon: 'bx bx-wrench',
          routerLinkName: '/user-management/roles'
        },
        {
          label: 'USER_MANAGEMENT.PERMISSIONS.TITLE',
          icon: 'bx bxs-lock',
          routerLinkName: '/user-management/permissions'
        },
        {
          label: 'USER_MANAGEMENT.LOGINHISTORY.TITLE',
          icon: 'bx bxs-log-in-circle',
          routerLinkName: '/user-management/login-history'
        }
      ]
    },
    {
      label: 'REPORTS.TITLE',
      icon: 'bx bxs-report',
      routerLinkName: '/reports',
      children: [
        {
          label: 'REPORTS.HIGHEST_EARNING',
          icon: 'bx bx-line-chart',
          routerLinkName: '/reports/highest-earning'
        },
        {
          label: 'REPORTS.LOWEST_EARNING',
          icon: 'bx bx-line-chart-down',
          routerLinkName: '/reports/lowest-earning'
        },
        {
          label: 'REPORTS.HIGH_IN_DEMAND',
          icon: 'bx bx-coin-stack',
          routerLinkName: '/reports/high-in-demand'
        },
        {
          label: 'REPORTS.LOW_IN_DEMAND',
          icon: 'bx bx-coin',
          routerLinkName: '/reports/low-in-demand'
        },
        {
          label: 'REPORTS.TRANSACTIONS_BY_YEAR',
          icon: 'bx bx-dollar',
          routerLinkName: '/reports/transactions-by-year'
        },
        {
          label: 'REPORTS.TRANSACTIONS_BY_MONTH',
          icon: 'bx bx-dollar',
          routerLinkName: '/reports/transactions-by-month'
        },
        {
          label: 'REPORTS.TRANSACTIONS_BY_DAY',
          icon: 'bx bx-dollar',
          routerLinkName: '/reports/transactions-by-day'
        }
      ]
    }
  ];

  constructor(private sidebarService: SidebarToggleService, private http: HttpService) {}

  ngOnInit(): void {
    this.sidebarService.isSidebarOpened$.subscribe(isSidebarOpened => (this.isSidebarOpened = isSidebarOpened));
  }

  /**
   * Toggle Side Bar
   */
  sidebarToggle() {
    this.sidebarService.toggle();
  }
}
