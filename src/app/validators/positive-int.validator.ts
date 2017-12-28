import { Directive } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator, ValidationErrors } from '@angular/forms';


@Directive({
 selector: '[positiveInteger]',
 providers: [{provide: NG_VALIDATORS, useExisting: PositiveIntegerValidatorDirective, multi: true}]
})
export class PositiveIntegerValidatorDirective implements Validator {

 validate(c: FormControl): ValidationErrors {
   if(!c.value) return null;
   const numValue = Number(c.value);
   const isValid = !isNaN(numValue) && numValue > 0 && Number.isInteger(numValue); 
   const message = {
     'positiveInteger': {
       'message': c.value + ' must be a valid positive integer' 
     }
   };
   return isValid ? null : message;
 }
}