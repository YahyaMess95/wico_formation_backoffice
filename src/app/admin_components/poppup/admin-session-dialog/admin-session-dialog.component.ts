import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { NotifService } from "app/Services/notif.service";
import { SessionService } from "app/Services/session.service";

@Component({
  selector: "admin-session-dialog",
  templateUrl: "./admin-session-dialog.component.html",
  styleUrls: ["./admin-session-dialog.component.css"],
})
export class AdminSessionDialogComponent implements OnInit {
  @Output() sessionAdded: EventEmitter<void> = new EventEmitter<void>();

  submittedIn = false;
  fileName = this.data?.photo || "No Image uploaded yet.";

  constructor(
    private notifService: NotifService,
    private sessionService: SessionService,
    private dialogRef: MatDialogRef<AdminSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  formesession: FormGroup;

  initializeForm(): void {
    this.formesession = new FormGroup({
      name: new FormControl(this.data?.name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      datedeb: new FormControl(this.data?.datedeb || "", [Validators.required]),
      type: new FormControl(this.data?.type || "", [Validators.required]),
      organisation: new FormControl(this.data?.organisation || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      maxNbr: new FormControl(this.data?.maxNbr || "", [
        Validators.required,
        Validators.minLength(1),
      ]),
      image: new FormControl(this.fileName, [Validators.required]),
    });
  }

  public saveOrUpdateSession(): void {
    this.submittedIn = true;

    if (this.formesession.invalid) {
      console.log("error ", this.formesession.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulair invalid",
        "danger"
      );
      return;
    }

    const sessionDetails = this.formesession.value;

    if (this.data) {
      this.updateSession(this.data._id, sessionDetails);
    } else {
      this.addSession(sessionDetails);
    }
  }

  addSession(sessionDetails): void {
    this.sessionService.addSession(sessionDetails).subscribe(
      (response) => {
        console.log("Session added successful", response);
        this.formesession.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session added successful",
          "success"
        );
        this.dialogRef.close();
        this.sessionAdded.emit();
      },
      (error) => {
        console.error("Session addition failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  updateSession(_id, sessionDetails): void {
    this.sessionService.updateSession(_id, sessionDetails).subscribe(
      (response) => {
        console.log("Session updated successfully", response);
        this.formesession.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session updated successfully",
          "success"
        );
        this.dialogRef.close();
        this.sessionAdded.emit();
      },
      (error) => {
        console.error("Session update failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  get fI(): { [key: string]: AbstractControl } {
    return this.formesession.controls;
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      // const formData = new FormData();
      // formData.append("thumbnail", file);
    }
  }

  type = new FormControl("");
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
