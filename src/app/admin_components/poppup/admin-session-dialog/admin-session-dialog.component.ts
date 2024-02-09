import { Component, OnInit } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";

@Component({
  selector: "admin-session-dialog",
  templateUrl: "./admin-session-dialog.component.html",
  styleUrls: ["./admin-session-dialog.component.css"],
})
export class AdminSessionDialogComponent implements OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formesession = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      datedeb: ["", [Validators.required]],
      types: ["", [Validators.required]],
      organisation: ["", [Validators.required, Validators.minLength(3)]],
      maxnb: ["", [Validators.required, Validators.minLength(1)]],
    });
  }

  formesession: FormGroup = new FormGroup({
    nom: new FormControl(""),
    datedeb: new FormControl(""),
    organisation: new FormControl(""),
    maxnb: new FormControl(""),
    types: new FormControl(""),
  });
  public Addsession(e: Event) {
    this.submittedIn = true;

    if (this.formesession.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formesession.value);
    this.formesession.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formesession.controls;
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

  types = new FormControl("");
  typeList: string[] = ["Remotely", "Locally"];

  formations = new FormControl("");
  formationList: string[] = [
    "formation 1",
    "formation 2",
    "formation 3",
    "formation 4",
    "formation 5",
    "formation 6",
  ];
  seances = new FormControl("");
  seancenList: string[] = [
    "seance 1",
    "seance 2",
    "seance 3",
    "seance 4",
    "seance 5",
    "seance 6",
  ];
}

interface Type {
  value: string;
  viewValue: string;
}
