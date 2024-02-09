import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Component, Input, OnInit } from "@angular/core";
import { LoaderService } from "./loader.service";

@Component({
  selector: "loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      transition("void <=> *", animate("300ms ease-in-out")),
    ]),
  ],
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    setInterval(() => {
      this.isLoading = !this.isLoading;
    }, 1000); // Toggle every 3 seconds (adjust as needed)
    // Optional: If you're using a loader service to manage loading state
    this.loaderService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
