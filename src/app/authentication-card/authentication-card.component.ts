import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { confirmPasswordValidator } from '../Validators/form_validators';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-authentication-card',
  templateUrl: './authentication-card.component.html',
  styleUrl: './authentication-card.component.css',
})
export class AuthenticationCardComponent implements OnInit {
  submittedIn = false;
  submittedUp = false;
  constructor(
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private formBuilder: NonNullableFormBuilder,
    private toastr: ToastrService
  ) {}

  formeSignIn: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  formeSignUp: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    u_email: new FormControl(''),
    u_Password: new FormControl(''),
    c_password: new FormControl(''),
  });

  ngOnInit(): void {
    this.formeSignIn = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.formeSignUp = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(6)]],
      lastName: ['', [Validators.required, Validators.minLength(6)]],
      u_email: ['', [Validators.required, Validators.email]],
      u_Password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: [
        '',
        [Validators.required, confirmPasswordValidator('u_Password')],
      ],
    });
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formeSignIn.controls;
  }
  get fU(): { [key: string]: AbstractControl } {
    return this.formeSignUp.controls;
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

  public signIn(e: Event) {
    this.submittedIn = true;

    if (this.formeSignIn.invalid) {
      this.showError('Erreur!', 'Erreur!');
      return;
    }
    e.preventDefault();
    this.showSuccess('SignIn', 'Successfully!');
    this.formeSignIn.reset();
  }

  public signUp(e: Event) {
    this.submittedUp = true;

    if (this.formeSignUp.invalid) {
      this.showError('Erreur!', 'Erreur!');
      return;
    }
    e.preventDefault();
    this.showSuccess('SignUp', 'Successfully!');
    this.formeSignUp.reset();
  }

  openPopup() {
    const modalRef = this.modalService.open(ForgetPasswordComponent, {
      size: 'l',
      modalDialogClass: 'modal-dialog-centered',
    });
  }
}
