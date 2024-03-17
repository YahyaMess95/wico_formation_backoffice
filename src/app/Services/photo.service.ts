import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";

@Injectable({
  providedIn: "root",
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  getPhoto(filename: string): any {
    return this.http.get(environment.photoUrl + `/${filename}`, {
      responseType: "blob",
    });
  }
}
