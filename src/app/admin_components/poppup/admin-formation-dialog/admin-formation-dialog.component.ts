import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormationService } from "app/Services/formation.service";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-formation-dialog",
  templateUrl: "./admin-formation-dialog.component.html",
  styleUrls: ["./admin-formation-dialog.component.css"],
})
export class AdminFormationDialogComponent implements OnInit {
  @Output() formationAdded: EventEmitter<void> = new EventEmitter<void>();
  submittedIn = false;
  constructor(
    private notifService: NotifService,
    private formationService: FormationService,
    private dialogRef: MatDialogRef<AdminFormationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  contenus = new FormControl("");
  contenuList: string[] = [] || this.data?.contenus;

  formeformation: FormGroup;

  initializeForm(): void {
    this.formeformation = new FormGroup({
      name: new FormControl(this.data?.name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.data?.description || "", [
        Validators.required,
        Validators.minLength(8),
      ]),
      tags: new FormControl(this.data?.tags || "", [
        Validators.required,
        Validators.minLength(1),
      ]),
      contenus: new FormControl(this.data?.contenus || []),
    });
  }
  public Addforamtion(e: Event) {
    this.submittedIn = true;

    if (this.formeformation.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeformation.value);
    this.formeformation.reset();
  }

  public saveOrUpdateFormation(): void {
    this.submittedIn = true;

    if (this.formeformation.invalid) {
      console.log("error ", this.formeformation.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulair invalid",
        "danger"
      );
      return;
    }

    const sessionDetails = this.formeformation.value;

    if (this.data) {
      this.updateFormation(this.data._id, sessionDetails);
    } else {
      this.addFormation(sessionDetails);
    }
  }

  addFormation(sessionDetails): void {
    this.formationService.addFormation(sessionDetails).subscribe(
      (response) => {
        console.log("Formation added successful", response);
        this.formeformation.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Formation added successful",
          "success"
        );
        this.dialogRef.close();
        this.formationAdded.emit();
      },
      (error) => {
        console.error("Formation addition failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  updateFormation(_id, sessionDetails): void {
    this.formationService.updateFormation(_id, sessionDetails).subscribe(
      (response) => {
        console.log("Formation updated successfully", response);
        this.formeformation.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Formation updated successfully",
          "success"
        );
        this.dialogRef.close();
        this.formationAdded.emit();
      },
      (error) => {
        console.error("Formation update failed", error);
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
    return this.formeformation.controls;
  }
}
