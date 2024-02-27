import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifService } from "app/Services/notif.service";
import { TemoignageService } from "app/Services/temoignage.service";

@Component({
  selector: "admin-temoignage-dialog",
  templateUrl: "./admin-temoignage-dialog.component.html",
  styleUrls: ["./admin-temoignage-dialog.component.css"],
})
export class AdminTemoignageDialogComponent implements OnInit {
  @Output() temoignageAdded: EventEmitter<void> = new EventEmitter<void>();
  submittedIn = false;
  constructor(
    private notifService: NotifService,
    private temoignageService: TemoignageService,
    private dialogRef: MatDialogRef<AdminTemoignageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  formetemoignages: FormGroup;

  initializeForm(): void {
    this.formetemoignages = new FormGroup({
      name: new FormControl(this.data?.name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      prenom: new FormControl(this.data?.prenom || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      source: new FormControl(this.data?.source || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      mention: new FormControl(this.data?.mention || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      competences: new FormControl(this.data?.competences || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      domaine: new FormControl(this.data?.domaine || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      comment: new FormControl(this.data?.comment || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      image: new FormControl(this.data?.image || "No Image uploaded yet.", [
        Validators.required,
      ]),
      cv: new FormControl(this.data?.cv || "No CV uploaded yet.", [
        Validators.required,
      ]),
    });
  }

  public saveOrUpdateTemoignage(): void {
    this.submittedIn = true;

    if (this.formetemoignages.invalid) {
      console.log("error ", this.formetemoignages.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulair invalid",
        "danger"
      );
      return;
    }

    const userDetails = this.formetemoignages.value;

    if (this.data) {
      this.updateTemoignage(this.data._id, userDetails);
    } else {
      this.addTemoignage(userDetails);
    }
  }

  addTemoignage(userDetails): void {
    this.dialogRef.close();
    this.temoignageService.addTemoignage(userDetails).subscribe(
      (response) => {
        console.log("Temoignage added successfully", response);
        this.formetemoignages.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Temoignage added successfully",
          "success"
        );

        this.temoignageAdded.emit();
      },
      (error) => {
        console.error("Temoignage addition failed", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  updateTemoignage(_id, userDetails): void {
    this.dialogRef.close();
    this.temoignageService.updateTemoignage(_id, userDetails).subscribe(
      (response) => {
        console.log("Temoignage updated successfully", response);
        this.formetemoignages.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Temoignage updated successfully",
          "success"
        );
        this.temoignageAdded.emit();
      },
      (error) => {
        console.error("Temoignage update failed", error);
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
    return this.formetemoignages.controls;
  }

  onImageSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formetemoignages.patchValue({
        image: file.name,
      });

      const formData = new FormData();
      formData.append("photo", file);
    }
  }

  onCVSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formetemoignages.patchValue({
        cv: file.name,
      });

      const formData = new FormData();
      formData.append("cv", file);
    }
  }
}
