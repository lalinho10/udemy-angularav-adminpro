import { FormGroup, ValidatorFn } from '@angular/forms';

export function DifferentPasswordValidator( password1Key: string, password2Key: string ): ValidatorFn {
	
	return ( formGroup: FormGroup ): { [ key: string ]: any } => {
		const valor1 = formGroup.get( password1Key ).value;
		const valor2 = formGroup.get( password2Key ).value;

		if( valor1 !== valor2 ) {
			return { 'differentPassword': true };
		}

		return null;
	}

}
