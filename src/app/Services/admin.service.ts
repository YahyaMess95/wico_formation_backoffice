import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers(page: number, pageSize: number) {
    const url = `${environment.allUsersUrl}?page=${page}&pageSize=${pageSize}`;
    // console.log("page: " + page + " pageSize: " + pageSize);
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  removeUser(userId: string) {
    return this.http.delete(environment.deleteUserUrl + `/${userId}`).pipe(
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  updateUser(userId: string, userData: any) {
    return this.http
      .patch(environment.updateUserUrl + `/${userId}`, userData)
      .pipe(
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  addUser(userDetails: any) {
    return this.http.post<any>(environment.addUserUrl, userDetails).pipe(
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
