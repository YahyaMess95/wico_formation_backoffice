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
      photo: new FormControl([Validators.required]),
      cv: new FormControl(this.data?.cv || "", [Validators.required]),
    });
  }

  public saveOrUpdateTemoignage(): void {
    this.submittedIn = true;

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
      this.updateTemoignage(this.data._id);
    } else {
      this.addTemoignage();
    }
  }

  addTemoignage(): void {
    const userDetails = this.formetemoignages.value;
    const photo = this.fileUpload.nativeElement.files[0];
    const cv = this.filecvUpload.nativeElement.files[0];
    const formData = new FormData();
    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    formData.append("file", photo);

    this.dialogRef.close();
    this.temoignageService.addTemoignage(formData).subscribe(
      (response) => {
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

  updateTemoignage(_id): void {
    const userDetails = this.formetemoignages.value;
    const photo = this.fileUpload.nativeElement.files[0];
    const cv = this.filecvUpload.nativeElement.files[0];

    const formData = new FormData();

    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    formData.append("file", photo);
    console.log("User Details:", photo);
    console.log("User formData:", formData);
    this.dialogRef.close();
    this.temoignageService.updateTemoignage(_id, formData).subscribe(
      (response) => {
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
