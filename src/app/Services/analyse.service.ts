import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { catchError, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnalyseService {
  constructor(private http: HttpClient) {}

  getCount(year) {
    const url = `${environment.countUrl}?year=${year}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
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
