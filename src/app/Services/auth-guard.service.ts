import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { NotifService } from "./notif.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotifService
  ) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      console.log("Admin is not authenticated. Redirecting to login page.");
      this.router.navigate(["/login"]);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "L'utilisateur n'est pas authentifié !",
        "danger"
      );
      return false;
    }
  }
}
