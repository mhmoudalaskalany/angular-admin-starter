import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
    template: ''
})
export class DialogComponent implements OnInit {

    private destroy$ = new Subject<any>();

    constructor(private dialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.data.pipe(first()).subscribe(data => this.openDialog(data));
    }

    openDialog(data: Data): void {
        const dialogRef = this.dialog.open(data['component'], { autoFocus: false, panelClass: ['medium', 'p-0'], data: { activatedRoute: this.activatedRoute.parent } });
        dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(_ => {
            this.router.navigate([data['redirectTo'] ? data['redirectTo'] : '..'], { relativeTo: this.activatedRoute });
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}

// Usage Way...
// {
//     path: 'path-name',
//     data: { component: PathNameComponent },
//     component: DialogComponent
//   }