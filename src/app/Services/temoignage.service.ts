import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class TemoignageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTemoignages(page: number, pageSize: number) {
    const url = `${environment.allTemoignagesUrl}?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  removeTemoignage(temoignageId: string) {
    return this.http
      .delete(environment.deleteTemoignageUrl + `/${temoignageId}`)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  updateTemoignage(temoignageData: FormData) {
    return this.http
      .patch(environment.updateTemoignageUrl, temoignageData)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addTemoignage(temoignageDetails: FormData) {
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
