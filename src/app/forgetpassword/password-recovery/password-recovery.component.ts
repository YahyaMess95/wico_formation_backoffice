import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ResetPasswordService } from "app/Services/reset-password.service";

@Component({
  selector: "password-recovery",
  templateUrl: "./password-recovery.component.html",
  styleUrls: ["./password-recovery.component.css"],
})
export class PasswordRecoveryComponent implements OnInit {
  email: string = "";
  recoveryInProgress: boolean = false;
  recoveryError: string | null = null;
  recoverySuccess: boolean = false;
  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PasswordRecoveryComponent>,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {}

  async sendRecoveryEmail(): Promise<void> {
    this.isLoading = false;
    this.recoveryInProgress = true;
    this.recoveryError = null;

    try {
      this.resetPasswordService
        .recoverPassword(this.email.toString())
        .then(() => {
          this.recoveryInProgress = false;
          this.recoverySuccess = true;
          this.isLoading = false;
          setTimeout(() => this.dialogRef.close(), 3000); // Close the dialog after 3 seconds
        })
        .catch((error) => {
          this.isLoading = true;
          console.error("Error sending email:", error);
          this.recoveryInProgress = false;
          this.recoveryError =
            "Une erreur s'est produite lors de l'envoi de l'e-mail de récupération.";
        });
    } catch (error) {
      this.isLoading = true;
      console.error("Error sending email:", error);
      this.recoveryInProgress = false;
      this.recoveryError =
        "Une erreur s'est produite lors de l'envoi de l'e-mail de récupération.";
    }
  }
}
