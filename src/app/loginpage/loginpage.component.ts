import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/Services/auth.service";
import { NotifService } from "app/Services/notif.service";
import { UserService } from "app/Services/user.service";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
})
export class LoginpageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = true;
  submitted = false;
  fileName = "";
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/admin"]);
    }
    this.loginForm = this.formBuilder.group({
      login: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifService: NotifService,
    private authService: AuthService
  ) {}

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { login, password } = this.loginForm.value;
    this.isLoading = false;
    this.authService.login(login, password).subscribe(
      (response) => {
        console.log("Login successfully", response);
        this.loginForm.reset();
        this.router.navigate(["/admin"]);
      },
      (error) => {
        this.isLoading = true;
        console.error("Login failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  get fI(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
