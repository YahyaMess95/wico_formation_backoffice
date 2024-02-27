import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  getAllSessions() {
    this.authGuard.canActivate();
    return this.http.get<any>(environment.allSessionsUrl).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return this.handleError(error);
      })
    );
  }

  removeSession(sessionId: string) {
    this.authGuard.canActivate();
    return this.http
      .delete(environment.deleteSessionUrl + `/${sessionId}`)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  updateSession(sessionId: string, sessionData: any) {
    this.authGuard.canActivate();
    return this.http
      .patch(environment.updateSessionUrl + `/${sessionId}`, sessionData)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addSession(sessionDetails: any) {
    this.authGuard.canActivate();
    return this.http.post<any>(environment.addSessionUrl, sessionDetails).pipe(
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