import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(
  confirmControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const confirmPassword = control.parent?.get(confirmControlName)?.value;

    // Synchronous validation logic
    if (password === confirmPassword) {
      return null; // Passwords match, validation successful
    } else {
      control.setErrors({ passwordMismatch: true }); // Set error directly
      return { passwordMismatch: true }; // Return the error for validation
    }
  };
}
