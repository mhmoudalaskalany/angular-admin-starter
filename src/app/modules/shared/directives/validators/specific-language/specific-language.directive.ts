import { Directive, Input } from '@angular/core';
import { UntypedFormControl, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[specificLanguage]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: SpecificLanguageDirective, multi: true }
  ]
})
export class SpecificLanguageDirective {

  @Input() specificLanguage = '';

  constructor() { }

  validate(control: UntypedFormControl) {
    if (!control.value) { return null; }
    return this.validateLanguageFactory(control);
  }

  validateLanguageFactory(control: AbstractControl): { [key: string]: boolean } | null {
    const isValid = this.validateLanguage(control.value, this.specificLanguage);
    
    if (isValid) { return null; } else {
      return this.generateEroor(this.specificLanguage);
    }
  }

  validateLanguage(text: string, language: string): boolean {
    let rgex: RegExp = /^/;

    switch (language) {
      case 'ar':
        rgex = /^[\u0600-\u06FF0-9 ~_?`!@#$%^&*()+=|;':",.\-\/\\]*$/; // arabic caracters with spaces and numbers
        break;
      case 'en':
        rgex = /^[a-zA-Z0-9 ~_?`!@#$%^&*()+=|;':",.\-\/\\]*$/; // english caracters with spaces and numbers
        break;
      default:
        break;
    }

    return rgex.test(text);
  }

  generateEroor(lang: string): { [key: string]: boolean } {
    let error;

    if (lang === 'ar') {
      error = { arabicWord: true }
    } else {
      error = { englishWord: true }
    }

    return error;
  }
}