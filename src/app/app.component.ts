import { Component, OnInit } from "@angular/core";
import { LoaderService } from "./loader/loader.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private loaderService: LoaderService // Import your LoaderService
  ) {}

  ngOnInit() {
    // If you're using the Router to manage loading state
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Navigation is complete, deactivate the loader
        this.isLoading = false;
      });

    // If you're using a LoaderService to manage loading state
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
