import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: NonNullableFormBuilder,

    private toastr: ToastrService
  ) {}

  formeFP: FormGroup = new FormGroup({
    F_email: new FormControl(''),
  });
  ngOnInit(): void {
    this.formeFP = this.formBuilder.group({
      F_email: ['', [Validators.required, Validators.email]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.formeFP.controls;
  }
  showSuccess(title: string, subtitle: string) {
    this.toastr.success(title, subtitle),
      {
        timeOut: 3000,
      };
  }
  showError(title: string, subtitle: string) {
    this.toastr.error(title, subtitle),
      {
        timeOut: 3000,
      };
  }
  public send(e: Event) {
    this.submitted = true;

    if (this.formeFP.invalid) {
      this.showError('Erreur!', 'Erreur!');
      return;
    }
    e.preventDefault();
    this.showSuccess('Email Sended', 'Successfully!');
    this.formeFP.reset();
    this.activeModal.dismiss('Cross click');
  }
}
