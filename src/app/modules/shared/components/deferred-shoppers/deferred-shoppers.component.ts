import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-deferred-shoppers',
  templateUrl: './deferred-shoppers.component.html',
  styleUrls: ['./deferred-shoppers.component.scss']
})
export class DeferredShoppersComponent implements OnInit {

  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  get deferredPayments() { return JSON.parse(localStorage.getItem('paymentBody') as string) as any[] || []; }

  deferredShoppers = this.deferredPayments.map(each => each.customer);
  deferredShoppersFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd), takeUntil(this.destroy$)).subscribe((e: any) => {
      if (!e.url.includes('edit') && !e.url.includes('add')) this.deferredShoppersFormGroup.reset(), this.deferredShoppers = this.deferredPayments.map(each => each.customer);
    });

    this.initForm();
  }

  initForm() {
    this.deferredShoppersFormGroup = this.fb.group({
      shopperId: [null]
    });
  }

  getSelectedDeferredShopper(shooper: any) {
    const payment = this.deferredPayments.find(payment => payment.customerId === shooper.id)?.payload;
    localStorage.setItem('payment', JSON.stringify(payment));
    this.router.navigate(['/payments/add'], { queryParams: { isDeferred: true }, relativeTo: this.activatedRoute });
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
