import { Component, OnInit } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "admin-seance-dialog",
  templateUrl: "./admin-seance-dialog.component.html",
  styleUrls: ["./admin-seance-dialog.component.css"],
})
export class AdminSeanceDialogComponent implements OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formeseance = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      lieu: ["", [Validators.required, Validators.minLength(3)]],
      link: ["", [Validators.required]],
      date: ["", [Validators.required]],
      comment: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  formeseance: FormGroup = new FormGroup({
    nom: new FormControl(""),
    lieu: new FormControl(""),
    link: new FormControl(""),
    date: new FormControl(""),
    comment: new FormControl(""),
  });
  public Addseance(e: Event) {
    this.submittedIn = true;

    if (this.formeseance.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeseance.value);
    this.formeseance.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formeseance.controls;
  }
}

interface comment {
  value: string;
  viewValue: string;
}
