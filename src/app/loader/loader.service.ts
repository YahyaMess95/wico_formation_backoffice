import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {}

  // Method to show the loader
  showLoader(): void {
    this.isLoadingSubject.next(true);
  }

  // Method to hide the loader
  hideLoader(): void {
    this.isLoadingSubject.next(false);
  }
}
