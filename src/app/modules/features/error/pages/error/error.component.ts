import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorNumber = '401';
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const acceptiableStatuses = this.activeRoute.snapshot.data['acceptiableStatuses'] as string[];
    this.activeRoute.params.pipe(takeUntil(this.destroy$)).subscribe(data => {
      if (acceptiableStatuses.includes(data['errorNumber'])) {
        this.errorNumber = data['errorNumber'];
      } else {
        this.router.navigateByUrl('/error/404');
      }
    });
  }

  logout() {
    localStorage.clear();
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
