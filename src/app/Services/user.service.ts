import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { tap, catchError, throwError, Observable } from "rxjs";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  login(name: string, password: string) {
    return this.http.post<any>(environment.loginUrl, { name, password }).pipe(
      tap((response: any) => {
        if (response && response.admin.token) {
          this.authService.setToken(response.admin.token);
        }
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  getAllUsers() {
    this.authGuard.canActivate();
    return this.http.get<any>(environment.allUsersUrl).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return this.handleError(error);
      })
    );
  }

  removeUser(userId: string) {
    this.authGuard.canActivate();
    return this.http.delete(environment.deleteUserUrl + `/${userId}`).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  updateUser(userId: string, userDetails: FormData) {
    this.authGuard.canActivate();
    // check
    const fileKeys = [];

    // If there are files, display their names
    if (fileKeys.length > 0) {
      console.log("Files attached:");
      fileKeys.forEach(({ key, value }) => {
        console.log(value.name);
      });
    } else {
      console.log("No files attached.");
    }

    return this.http
      .patch(environment.updateUserUrl + `/${userId}`, userDetails)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addUser(userDetails: FormData) {
    this.authGuard.canActivate();

    return this.http.post<any>(environment.addUserUrl, userDetails).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return this.handleError(error);
      })
    );
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
