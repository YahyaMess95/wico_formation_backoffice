import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormationService } from "app/Services/formation.service";
import { NotifService } from "app/Services/notif.service";
import { SeanceService } from "app/Services/seance.service";
import { SessionService } from "app/Services/session.service";

@Component({
  selector: "admin-session-dialog",
  templateUrl: "./admin-session-dialog.component.html",
  styleUrls: ["./admin-session-dialog.component.css"],
})
export class AdminSessionDialogComponent implements OnInit {
  @Output() sessionAdded: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("fileUpload") fileUpload: ElementRef;
  formations: any[] = [];
  seances: any[] = [];
  submittedIn = false;
  fileName;

  constructor(
    private notifService: NotifService,
    private sessionService: SessionService,
    private formationService: FormationService,
    private seanceService: SeanceService,
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
      photo: new FormControl(null, this.getValidators()),
      formations: new FormControl(this.loadFormations()),
      seances: new FormControl(this.loadSeances()),
    });
  }
  getValidators() {
    console.log(this.data);
    if (this.data != null) {
      return [];
    } else {
      return [Validators.required];
    }
  }
  public saveOrUpdateSession(): void {
    this.submittedIn = true;

    if (this.formesession.invalid) {
      console.log("error ", this.formesession.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulaire invalide",
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
    let photo;
    const fileInput = this.fileUpload.nativeElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      photo = fileInput.files[0];
    }
    const formData = new FormData();
    Object.keys(sessionDetails).forEach((key) => {
      formData.append(key, sessionDetails[key]);
    });

    formData.append("file", photo);
    this.dialogRef.close();
    this.sessionService.addSession(formData).subscribe(
      (response) => {
        console.log("Session added successful", response);
        this.formesession.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session ajoutée avec succès",
          "success"
        );
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
    let photo;
    const fileInput = this.fileUpload.nativeElement;
    if (this.data) {
      sessionDetails.photo = this.data?.photo;
    }

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      photo = fileInput.files[0];
    }
    const formData = new FormData();

    Object.keys(sessionDetails).forEach((key) => {
      formData.append(key, sessionDetails[key]);
    });

    formData.append("file", photo);
    formData.append("_id", _id);
    this.dialogRef.close();

    this.sessionService.updateSession(formData).subscribe(
      (response) => {
        console.log("Session updated successfully", response);
        this.formesession.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session mise à jour avec succès",
          "success"
        );
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
    this.fileName = file.name;
    this.formesession.patchValue({
      photo: file ? file.name : null,
    });
  }

  type = new FormControl("");
  typeList: string[] = ["Remotely", "Locally"];
  selectedFormationIds: string[] = [];
  loadFormations(): void {
    if (this.data && this.data.formations) {
      this.formationService.getAllFormations(0, 0).subscribe(
        (response) => {
          const formationsFromBackend = response.formation;
          if (Array.isArray(formationsFromBackend)) {
            this.formations = formationsFromBackend.map((formation) => ({
              id: formation._id,
              name: formation.name,
            }));

            if (Array.isArray(this.data.formations)) {
              this.selectedFormationIds = this.data.formations;
            } else {
              console.error(
                "this.data.formations is not an array:",
                this.data.formations
              );
            }
          } else {
            console.error("Sessions is not an array:", formationsFromBackend);
          }
        },
        (error) => {
          console.error("Error fetching formations:", error);
        }
      );
    } else {
      this.formationService.getAllFormations(0, 0).subscribe(
        (response) => {
          const formationsFromBackend = response.formation;
          this.formations = formationsFromBackend.map((formation) => ({
            id: formation._id,
            name: formation.name,
            checked: false,
          }));
        },
        (error) => {
          console.error("Error fetching formations:", error);
        }
      );
    }
  }

  // load seance
  selectedSeanceIds: string[] = [];
  loadSeances(): void {
    if (this.data && this.data.seances) {
      this.seanceService.getAllSeances(0, 0).subscribe(
        (response) => {
          const seancesFromBackend = response.seance;
          // Check if seances is defined and is an array
          if (Array.isArray(seancesFromBackend)) {
            // Extract seance names
            this.seances = seancesFromBackend.map((seance) => ({
              id: seance._id,
              name: seance.name,
            }));
            // Select seances based on this.data.seances
            this.selectedSeanceIds = this.data.seances;
          } else {
            console.error("Sessions is not an array:", seancesFromBackend);
            // Handle the error or set a default value for seanceList
          }
        },
        (error) => {
          console.error("Error fetching seances:", error);
        }
      );
    } else {
      this.seanceService.getAllSeances(0, 0).subscribe(
        (response) => {
          const seancesFromBackend = response.seance;
          // Extract seance names
          this.seances = seancesFromBackend.map((seance) => ({
            id: seance._id,
            name: seance.name,
            checked: false, // Assuming seances from the database are initially unchecked
          }));
        },
        (error) => {
          console.error("Error fetching seances:", error);
        }
      );
    }
  }
}
