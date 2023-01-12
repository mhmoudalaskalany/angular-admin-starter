import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';
import { TranslationService } from 'core/services/translation/translation.service';
import { Subscription, of, delay, Subject, takeUntil } from 'rxjs';

interface dropdown {
  id: string | null;
  nameEn: string;
  nameAr: string;
};

type Label = 'nameEn' | 'nameAr';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  selectedOption!: dropdown | undefined;
  selectedOptions: dropdown[] = [];
  controlSubscription: Subscription | undefined;
  selectedAll = false;
  count = 5;
  showMore = false;
  _searchValue = '';
  lang = '';
  
  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();

  // Inputs
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
  @Input() options: dropdown[] = [];
  @Input() bindValue = 'id';
  @Input() bindLabel!: Label; // by default = nameEn or nameAr
  @Input() placeholder = '';
  @Input() customClass = '';
  @Input() notFoundText = ''; // empty text appears when dropdown options is empty
  @Input() pipeCustomError = '';
  @Input() showCount = false;
  @Input() searchable = false;
  @Input() withCheckbox = false; // 
  @Input() selectableGroup = false; // allow the user to selec group of options
  @Input() isMulti = false; // multiple or single
  @Input() isTextWithIndex = false; // add index to the option. ex: Option 1
  @Input() isDisabled = false;

  // Outputs
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  @Output() searchValue: EventEmitter<any> = new EventEmitter();

  @ViewChild(NgSelectComponent, { static: false }) ngSelectComponent: NgSelectComponent | any;

  constructor(private translation: TranslationService) { }

  ngOnInit() {
    this.translation.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe(lang => this.lang = lang);
  }

  ngOnChanges() {
    if (this.isMulti) {
      setTimeout(() => {
        this.selectedOptions = JSON.parse(JSON.stringify(this.options.filter(option => this.formGroup.get(this.controlName)?.value?.includes(option.id))));
      }, 100);

      if (this.isTextWithIndex) {
        this.options.map((option, index) => {
          option.nameEn = option.nameEn + ' ' + (index + 1);
          option.nameAr = option.nameAr + ' ' + (index + 1);
        });
      }

      this.controlSubscription = this.formGroup.get(this.controlName)?.valueChanges.subscribe((value) => {
        if (!value) { this.selectedOptions = []; }
      });
    } else {
      if (this.options && this.formGroup.get(this.controlName)?.value) {
        this.options.map((option, index) => {
          if (option.id === this.formGroup.get(this.controlName)?.value) {
            this.selectedOption = option;
          }

          if (this.isTextWithIndex) {
            option.nameEn = option.nameEn + ' ' + (index + 1);
            option.nameAr = option.nameAr + ' ' + (index + 1);
          }
        });
      }
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.controlSubscription?.unsubscribe();
  }

  get getBindLabel() {
    if (!this.bindLabel) {
      return this.lang === 'en' ? 'nameEn' : 'nameAr';
    }

    return this.bindLabel;
  }

  onChange(event: dropdown[] | dropdown) {
    if (this.isMulti) {
      this.selectedOptions = (event as dropdown[]);

      if (this.selectedOptions.length === 1) {
        if (this.selectedOptions.find(each => each.nameEn === 'ACTIONS.ALL')) {
          this.formGroup.get(this.controlName)?.setValidators([]);
          this.formGroup.get(this.controlName)?.setValue(null);
          this.selectedOptions = (event as dropdown[]);
        }
      } else {
        this.selectedOptions = (event as dropdown[]);
        if (this.selectedOptions.find(each => each.nameEn === 'ACTIONS.ALL')) {
          this.formGroup.get(this.controlName)?.setValidators([]);
          this.formGroup.get(this.controlName)?.setValue(null);
          this.selectedOptions = [{ id: null, nameEn: 'ACTIONS.ALL', nameAr: 'ACTIONS.ALL' }];
        }
      }
    }

    this.selected.emit(event);
  }

  onAdd(item: any) {
    // console.log(item);
  }

  onRemove(item: any) {
    // console.log(item);
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();

    // Creating and array of space saperated term and removinf the empty values using filter
    let splitTerm = term.split(' ').filter(t => t);

    let isWordThere: any[] = [];

    // Pushing True/False if match is found
    splitTerm.forEach(arr_term => {
      let search = item['text'].toLowerCase();
      isWordThere.push(search.indexOf(arr_term) != -1);
    });

    const all_words = (this_word: any) => this_word;
    // Every method will return true if all values are true in isWordThere.
    return isWordThere.every(all_words);
  }

  onSearch(event: any) {
    this._searchValue = event.term;

    if (!event.items.length) {
      this.count = 5;

      // emit the search value after the user written it
      of(this._searchValue).pipe(
        delay(500)
      ).subscribe(value => {
        if (this._searchValue.length === value.length) {
          this.searchValue.emit(this._searchValue);
          if (this._searchValue.length > 3) {
            this.ngSelectComponent.handleClearClick();
          }
        }
      });
    }
  }

  onScroll(event: any) {
    if (event.start === this.count) {
      this.count += 5;
      this.searchValue.emit(this._searchValue);
    }
  }

  removeSelectedOption() {
    this.deleted.emit();
    this.selectedOption = undefined;
    this.formGroup.get(this.controlName)?.reset();
  }

  removeFromList(option: any) {
    this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    const formValue = this.selectedOptions.map(option => option.id);
    this.selectedOptions.length ? this.formGroup.get(this.controlName)?.setValue(formValue) : this.formGroup.get(this.controlName)?.reset();
  }
}

