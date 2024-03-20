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
  @ViewChild("fileUpload") fileUpload: ElementRef;
  @ViewChild("filecvUpload") filecvUpload: ElementRef;
  submittedIn = false;
  photo;
  cv;
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
      photo: new FormControl(null, this.getValidators()),
      cv: new FormControl(null, this.getValidators()),
    });
  }

  getValidators() {
    if (this.data != null) {
      return [];
    } else {
      return [Validators.required];
    }
  }

  public saveOrUpdateTemoignage(): void {
    this.submittedIn = true;
    const userDetails = this.formetemoignages.value;
    if (this.formetemoignages.invalid) {
      console.log("error ", this.formetemoignages.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulaire invalide",
        "danger"
      );
      return;
    }

    if (this.data) {
      this.updateTemoignage(this.data._id, userDetails);
    } else {
      this.addTemoignage(userDetails);
    }
  }

  addTemoignage(userDetails): void {
    let photo;
    let cv;
    const fileInput = this.fileUpload.nativeElement;
    const filecvUpload = this.filecvUpload.nativeElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      photo = fileInput.files[0];
    }
    if (filecvUpload && filecvUpload.files && filecvUpload.files.length > 0) {
      cv = filecvUpload.files[0];
    }

    const formData = new FormData();
    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    // Append photo file
    if (photo) {
      formData.append("file", photo);
    }

    // Append CV file
    if (cv) {
      formData.append("cvfile", cv);
    }

    this.temoignageService.addTemoignage(formData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log("Temoignage added successfully", response);
        this.formetemoignages.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Témoignage ajouté avec succès",
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
    let photo;
    let cv;
    const fileInput = this.fileUpload.nativeElement;
    const filecvInput = this.filecvUpload.nativeElement;

    if (this.data) {
      userDetails.photo = this.data?.photo;
      userDetails.cv = this.data?.cv;
    }
    // Check if a new photo is uploaded
    if (fileInput.files && fileInput.files.length > 0) {
      photo = fileInput.files[0];
    }

    // Check if a new CV is uploaded
    if (filecvInput.files && filecvInput.files.length > 0) {
      cv = filecvInput.files[0];
    }

    // Create FormData object
    const formData = new FormData();

    // Append user details to FormData
    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    // Append photo if provided
    if (photo) {
      formData.append("file", photo);
    }

    // Append cv if provided
    if (cv) {
      formData.append("cvfile", cv);
    }

    // Append _id for identification
    formData.append("_id", _id);

    // Update temoignage with user details and optional photo/cv
    this.temoignageService.updateTemoignage(formData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log("Temoignage updated successfully", response);
        this.formetemoignages.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Témoignage mis à jour avec succès",
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
      this.photo = file.name;
      this.formetemoignages.patchValue({
        photo: file.name,
      });
    }
  }

  onCVSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.cv = file.name;
      this.formetemoignages.patchValue({
        cv: file.name,
      });
    }
  }
}
