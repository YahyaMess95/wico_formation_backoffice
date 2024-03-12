import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenKey = "auth_token";
  private username = "use_name";
  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http.post<any>(environment.loginUrl, { login, password }).pipe(
      tap((response: any) => {
        if (response && response.user.token) {
          this.setToken(response.user.token);
          this.setUserName(response.user.results.name);
        }
      }),
      catchError((error: any) => {
        return this.handleError(error);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setUserName(name: string): void {
    localStorage.setItem(this.username, name);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.username);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserName(): string | null {
    return localStorage.getItem(this.username);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
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
