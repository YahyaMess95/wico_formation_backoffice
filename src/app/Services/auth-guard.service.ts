import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { NotifService } from "./notif.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotifService
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.log("Admin is not authenticated. Redirecting to login page.");
      this.router.navigate(["/login"]);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Admin is not authenticated!",
        "danger"
      );
      return false;
    }
  }
}
