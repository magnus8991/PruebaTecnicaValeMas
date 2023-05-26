import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class MiEstadoDeError extends ErrorStateMatcher
{
  esErrorDeEstado(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean
  {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
