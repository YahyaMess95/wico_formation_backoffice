import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TemoignageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private authGuard: AuthGuardService
  ) {}

  getAllTemoignages() {
    this.authGuard.canActivate();
    return this.http.get<any>(environment.allTemoignagesUrl).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return this.handleError(error);
      })
    );
  }

  removeTemoignage(temoignageId: string) {
    this.authGuard.canActivate();
    return this.http
      .delete(environment.deleteTemoignageUrl + `/${temoignageId}`)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  updateTemoignage(temoignageId: string, temoignageData: FormData) {
    this.authGuard.canActivate();
    return this.http
      .patch(
        environment.updateTemoignageUrl + `/${temoignageId}`,
        temoignageData
      )
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addTemoignage(temoignageDetails: FormData) {
    this.authGuard.canActivate();
    return this.http
      .post<any>(environment.addTemoignageUrl, temoignageDetails)
      .pipe(
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
