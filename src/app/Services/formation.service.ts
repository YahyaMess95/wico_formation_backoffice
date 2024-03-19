import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class FormationService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllFormations(page: number, pageSize: number) {
    const url = `${environment.allFormationsUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }
  getOneFormation(formationId) {
    const url = environment.oneFormationUrl + `/${formationId}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }
  removeFormation(formationId: string) {
    return this.http
      .delete(environment.deleteFormationUrl + `/${formationId}`)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  updateFormation(formationId: string, formationData: any) {
    return this.http
      .patch(environment.updateFormationUrl + `/${formationId}`, formationData)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addFormation(formationDetails: any) {
    return this.http
      .post<any>(environment.addFormationUrl, formationDetails)
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
