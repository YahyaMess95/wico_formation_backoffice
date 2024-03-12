import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class SeanceService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllSeances(page: number, pageSize: number) {
    const url = `${environment.allSeancesUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          this.authService.logout();
        }
        return this.handleError(error);
      })
    );
  }

  removeSeance(seanceId: string) {
    return this.http.delete(environment.deleteSeanceUrl + `/${seanceId}`).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  updateSeance(seanceId: string, seanceData: any) {
    return this.http
      .patch(environment.updateSeanceUrl + `/${seanceId}`, seanceData)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addSeance(seanceDetails: any) {
    return this.http.post<any>(environment.addSeanceUrl, seanceDetails).pipe(
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
