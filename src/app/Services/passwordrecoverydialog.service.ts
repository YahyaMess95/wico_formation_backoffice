import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PasswordRecoveryComponent } from "app/forgetpassword/password-recovery/password-recovery.component";

@Injectable({
  providedIn: "root",
})
export class PasswordrecoverydialogService {
  constructor(private dialog: MatDialog) {}
  openPasswordRecoveryDialog(): void {
    this.dialog.open(PasswordRecoveryComponent, {
      width: "400px", // Set the width of the dialog as per your requirement
    });
  }
}
