import { Component, OnInit } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "admin-temoignage-dialog",
  templateUrl: "./admin-temoignage-dialog.component.html",
  styleUrls: ["./admin-temoignage-dialog.component.css"],
})
export class AdminTemoignageDialogComponent implements OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formetemoignages = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      prenom: ["", [Validators.required, Validators.minLength(3)]],
      source: ["", [Validators.required, Validators.minLength(6)]],
      mention: ["", [Validators.required, Validators.minLength(6)]],
      competence: ["", [Validators.required, Validators.minLength(6)]],
      domain: ["", [Validators.required, Validators.minLength(6)]],
      comment: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  formetemoignages: FormGroup = new FormGroup({
    name: new FormControl(""),
    prenom: new FormControl(""),
    source: new FormControl(""),
    mention: new FormControl(""),
    competence: new FormControl(""),
    domain: new FormControl(""),
    comment: new FormControl(""),
  });
  public Addtemoignage(e: Event) {
    this.submittedIn = true;

    if (this.formetemoignages.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formetemoignages.value);
    this.formetemoignages.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formetemoignages.controls;
  }

  fileName = "";

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
    }
  }
}
