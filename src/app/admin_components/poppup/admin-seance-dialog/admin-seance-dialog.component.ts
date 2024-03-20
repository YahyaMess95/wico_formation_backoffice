import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifService } from "app/Services/notif.service";
import { SeanceService } from "app/Services/seance.service";

@Component({
  selector: "admin-seance-dialog",
  templateUrl: "./admin-seance-dialog.component.html",
  styleUrls: ["./admin-seance-dialog.component.css"],
})
export class AdminSeanceDialogComponent implements OnInit {
  @Output() seanceAdded: EventEmitter<void> = new EventEmitter<void>();
  submittedIn = false;
  isLoading: boolean = false;
  constructor(
    private notifService: NotifService,
    private seanceService: SeanceService,
    private dialogRef: MatDialogRef<AdminSeanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  formeseance: FormGroup;

  initializeForm(): void {
    const dateString = this.data?.date;
    const dateObject = dateString ? new Date(dateString) : null;
    this.formeseance = new FormGroup({
      name: new FormControl(this.data?.name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      date: new FormControl(dateObject, [Validators.required]),
      lieu: new FormControl(this.data?.lieu || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      link: new FormControl(this.data?.link || "", [Validators.required]),
      comment: new FormControl(this.data?.comment || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  public Addseance(e: Event) {
    this.submittedIn = true;

    if (this.formeseance.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeseance.value);
    this.formeseance.reset();
  }

  public saveOrUpdateSession(): void {
    this.submittedIn = true;

    if (this.formeseance.invalid) {
      console.log("error ", this.formeseance.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulaire invalide",
        "danger"
      );
      return;
    }

    const sessionDetails = this.formeseance.value;

    if (this.data) {
      this.isLoading = true;
      this.updateSeance(this.data._id, sessionDetails);
    } else {
      this.isLoading = true;
      this.addSeance(sessionDetails);
    }
  }

  addSeance(sessionDetails): void {
    this.seanceService.addSeance(sessionDetails).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log("Session added successful", response);
        this.formeseance.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session ajoutée avec succès",
          "success"
        );
        this.seanceAdded.emit();
      },
      (error) => {
        this.isLoading = false;
        console.error("Session addition failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "L'ajout de session a échoué",
          "danger"
        );
      }
    );
  }

  updateSeance(_id, sessionDetails): void {
    this.seanceService.updateSeance(_id, sessionDetails).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log("Session updated successfully", response);
        this.formeseance.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session mise à jour avec succès",
          "success"
        );
        this.seanceAdded.emit();
      },
      (error) => {
        this.isLoading = false;
        console.error("Session update failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Échec de la mise à jour de la session",
          "danger"
        );
      }
    );
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formeseance.controls;
  }
}
