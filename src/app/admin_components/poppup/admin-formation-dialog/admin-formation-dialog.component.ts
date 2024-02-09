import { Component, OnInit } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "admin-formation-dialog",
  templateUrl: "./admin-formation-dialog.component.html",
  styleUrls: ["./admin-formation-dialog.component.css"],
})
export class AdminFormationDialogComponent implements OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formeformation = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(8)]],
      tags: ["", [Validators.required, Validators.minLength(1)]],
    });
  }

  formeformation: FormGroup = new FormGroup({
    nom: new FormControl(""),
    description: new FormControl(""),
    tags: new FormControl(""),
  });
  public Addforamtion(e: Event) {
    this.submittedIn = true;

    if (this.formeformation.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeformation.value);
    this.formeformation.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formeformation.controls;
  }

  contenus = new FormControl("");
  contenuList: string[] = [
    "contenu 1",
    "contenu 2",
    "contenu 3",
    "contenu 4",
    "contenu 5",
    "contenu 6",
  ];
}
