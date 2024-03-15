import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import emailjs from "@emailjs/browser";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  async recoverPassword(email: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .patch<any>(environment.recoveryUrl, { email: email })
        .pipe(
          tap(async (response: any) => {
            const login = response.user.login;
            const randomPassword = response.user.randomPassword;

            await emailjs.send(
              environment.SERVICE_ID,
              environment.TEMPLATE_ID,
              { email, login, randomPassword },
              environment.USER_ID
            );
            console.log("Email sent successfully");
            resolve();
          }),
          catchError((error: any) => {
            reject(error);
            return this.handleError(error);
          })
        )
        .subscribe();
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(error.error.message);
  }
}
