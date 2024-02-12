import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
})
export class LoginpageComponent implements OnInit {
  registerForm: any = FormGroup;
  submitted = false;
  fileName = "";
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  public login(e: Event) {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.registerForm.value);
    this.registerForm.reset();
    this.router.navigate(["/admin"]);
  }

  get fI(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
}
