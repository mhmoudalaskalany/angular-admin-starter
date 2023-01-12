import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  currentPage = 1;
  isEnglish = false;

  @Input() totalCount!: number;
  @Input() pageSize!: number;

  @Output() pageSelected: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  onPageChange(pageNumber: number) {
    this.pageSelected.emit(pageNumber);
  }
}
