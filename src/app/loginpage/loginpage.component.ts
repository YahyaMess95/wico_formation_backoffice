import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NotifService } from "app/Services/notif.service";
import { AdminService } from "app/Services/admin.service";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
})
export class LoginpageComponent implements OnInit {
  loginForm!: FormGroup;

  submitted = false;
  fileName = "";
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // email: ["", [Validators.required, Validators.email]],
      name: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifService: NotifService,
    private adminService: AdminService
  ) {}

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { name, password } = this.loginForm.value;

    this.adminService.login(name, password).subscribe(
      (response) => {
        console.log("Login successful", response);
        this.loginForm.reset();
        this.router.navigate(["/admin"]);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Login successful",
          "wico"
        );
      },
      (error) => {
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
