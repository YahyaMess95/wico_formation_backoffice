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
import { CookieService } from "ngx-cookie-service";
import * as CryptoJS from "crypto-js";
import { PasswordrecoverydialogService } from "app/Services/passwordrecoverydialog.service";

@Component({
  selector: "app-loginpage",
  templateUrl: "./loginpage.component.html",
  styleUrls: ["./loginpage.component.css"],
})
export class LoginpageComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = true;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notifService: NotifService,
    private authService: AuthService,
    private cookieService: CookieService,
    private passwordrecoverydialogService: PasswordrecoverydialogService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/admin"]);
    }

    const rememberMe = this.cookieService.get("rememberMe");
    if (rememberMe === "true") {
      const encryptedLogin = this.cookieService.get("login");
      const encryptedPassword = this.cookieService.get("password");
      const login = this.decryptData(encryptedLogin);
      const password = this.decryptData(encryptedPassword);
      this.loginForm = this.formBuilder.group({
        login: [login, [Validators.required, Validators.minLength(3)]],
        password: [password, [Validators.required, Validators.minLength(6)]],
        rememberMe: [true],
      });
    } else {
      this.loginForm = this.formBuilder.group({
        login: ["", [Validators.required, Validators.minLength(3)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        rememberMe: [false],
      });
    }
  }

  login() {
    this.submitted = true;
    this.isLoading = false;
    if (this.loginForm.invalid) {
      return;
    }

    const { login, password } = this.loginForm.value;

    this.authService.login(login, password).subscribe(
      (response) => {
        if (this.loginForm.get("rememberMe").value) {
          const encryptedLogin = this.encryptData(login);
          const encryptedPassword = this.encryptData(password);
          this.cookieService.set(
            "login",
            encryptedLogin,
            null,
            null,
            null,
            true,
            "Lax"
          );
          this.cookieService.set(
            "password",
            encryptedPassword,
            null,
            null,
            null,
            true,
            "Lax"
          );
          this.cookieService.set(
            "rememberMe",
            "true",
            null,
            null,
            null,
            true,
            "Lax"
          );
        } else {
          this.cookieService.delete("login", null, null, true);
          this.cookieService.delete("password", null, null, true);
          this.cookieService.delete("rememberMe", null, null, true);
        }

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

  encryptData(data: string): string {
    const encryptedData = CryptoJS.AES.encrypt(data, "secret-key").toString();
    return encryptedData;
  }

  decryptData(encryptedData: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, "secret-key");
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }

  openPasswordRecoveryPopup(): void {
    this.passwordrecoverydialogService.openPasswordRecoveryDialog();
  }
}
