import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: "admin-user-list-dialog",
  templateUrl: "./admin-user-list-dialog.component.html",
  styleUrls: ["./admin-user-list-dialog.component.css"],
})
export class AdminUserListDialogComponent implements OnInit {
  submittedIn = false;
  fileName = "";

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.formeusers = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      prenom: ["", [Validators.required, Validators.minLength(3)]],
      address: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      login: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      cin: ["", [Validators.required, Validators.minLength(8)]],
      roles: ["", [Validators.required]],
      source: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  formeusers: FormGroup = new FormGroup({
    name: new FormControl(""),
    prenom: new FormControl(""),
    address: new FormControl(""),
    email: new FormControl(""),
    login: new FormControl(""),
    password: new FormControl(""),
    cin: new FormControl(""),
    roles: new FormControl(""),
    source: new FormControl(""),
  });

  public Adduser(e: Event) {
    this.submittedIn = true;

    if (this.formeusers.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeusers.value);
    this.formeusers.reset();
  }

  get fI(): { [key: string]: AbstractControl } {
    return this.formeusers.controls;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
    }
  }

  sessions = new FormControl("");
  sessionList: string[] = [
    "Session 1",
    "Session 2",
    "Session 3",
    "Session 4",
    "Session 5",
    "Session 6",
  ];
  roles = new FormControl("");
  roleList: string[] = ["User", "Formateur"];
}
