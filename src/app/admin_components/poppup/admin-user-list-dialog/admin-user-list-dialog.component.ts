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
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifService } from "app/Services/notif.service";
import { SessionService } from "app/Services/session.service";
import { UserService } from "app/Services/user.service";

@Component({
  selector: "admin-user-list-dialog",
  templateUrl: "./admin-user-list-dialog.component.html",
  styleUrls: ["./admin-user-list-dialog.component.css"],
})
export class AdminUserListDialogComponent implements OnInit {
  @Output() userAdded: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild("fileUpload") fileUpload: ElementRef;
  submittedIn = false;
  photoname;
  sessions: any[] = [];
  constructor(
    private notifService: NotifService,
    private userService: UserService,
    private sessionService: SessionService,
    private dialogRef: MatDialogRef<AdminUserListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    console.log(this.sessions);
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    this.photoname = file.name;
    this.formeusers.patchValue({
      photo: file ? file.name : null,
    });
  }

  formeusers: FormGroup;

  initializeForm(): void {
    this.formeusers = new FormGroup({
      name: new FormControl(this.data?.name || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      prename: new FormControl(this.data?.prename || "", [
        Validators.required,
        Validators.minLength(3),
      ]),
      addresse: new FormControl(this.data?.addresse || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(this.data?.email || "", [
        Validators.required,
        Validators.email,
      ]),
      login: new FormControl(this.data?.login || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl(this.data?.password || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      cin: new FormControl(this.data?.cin || "", [
        Validators.required,
        Validators.minLength(8),
        this.onlyNumbers,
      ]),
      roles: new FormControl(this.data?.roles || "", [Validators.required]),
      source: new FormControl(this.data?.source || "", [
        Validators.required,
        Validators.minLength(6),
      ]),
      sessions: new FormControl(this.loadSessions()),
      photo: new FormControl([Validators.required]),
    });
  }

  public saveOrUpdateUser(): void {
    this.submittedIn = true;
    console.log("value ", this.formeusers.value);
    const userDetails = this.formeusers.value;
    console.log(userDetails);

    if (this.formeusers.invalid) {
      console.log("error ", this.formeusers.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulaire invalide",
        "danger"
      );
      return;
    }

    if (this.data) {
      this.updateUser(this.data._id, userDetails);
    } else {
      this.addUser(userDetails);
    }
  }

  addUser(userDetails): void {
    const photo = this.fileUpload.nativeElement.files[0];
    const formData = new FormData();
    console.log(userDetails);
    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    formData.append("file", photo);
    this.dialogRef.close();
    console.log(formData);

    this.userService.addUser(formData).subscribe(
      (response) => {
        console.log("User added successful", response);
        this.formeusers.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "L'utilisateur a été ajouté avec succès",
          "success"
        );
        this.userAdded.emit();
      },
      (error) => {
        console.error("L'ajout d'un utilisateur a échoué", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }

  updateUser(_id, userDetails): void {
    const photo = this.fileUpload.nativeElement.files[0];
    const formData = new FormData();

    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    formData.append("file", photo);

    this.dialogRef.close();

    this.userService.updateUser(_id, formData).subscribe(
      (response) => {
        console.log("User updated successfully", response);
        this.formeusers.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "L'utilisateur a été mis à jour avec succès",
          "success"
        );

        this.userAdded.emit();
      },
      (error) => {
        console.error("Échec de la mise à jour utilisateur", error);
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
    return this.formeusers.controls;
  }

  onlyNumbers(control) {
    const numericValue = parseFloat(control.value);
    if (!isNaN(numericValue)) {
      return null;
    } else {
      return { onlyNumbers: true };
    }
  }
  selectedSessionIds: string[] = [];

  loadSessions(): void {
    console.log(this.data?.sessions);

    if (this.data && this.data.sessions) {
      this.sessionService.getAllSessions(0, 0).subscribe(
        (response) => {
          const sessionsFromBackend = response.session;
          // Check if sessions is defined and is an array
          if (Array.isArray(sessionsFromBackend)) {
            // Extract session names
            this.sessions = sessionsFromBackend.map((session) => ({
              id: session._id,
              name: session.name,
            }));
            // Select sessions based on this.data.sessionsif

            this.selectedSessionIds = this.data.sessions;
          } else {
            console.error("Sessions is not an array:", sessionsFromBackend);
            // Handle the error or set a default value for sessionList
          }
        },
        (error) => {
          console.error("Error fetching sessions:", error);
        }
      );
    } else {
      this.sessionService.getAllSessions(0, 0).subscribe(
        (response) => {
          const sessionsFromBackend = response.session;
          // Extract session names
          this.sessions = sessionsFromBackend.map((session) => ({
            id: session._id,
            name: session.name,
            checked: false, // Assuming sessions from the database are initially unchecked
          }));
        },
        (error) => {
          console.error("Error fetching sessions:", error);
        }
      );
    }
  }

  roles = new FormControl("");
  roleList: string[] = [
    "Utilisateur",
    "Formateur",
    "Étudiant",
    "Administrateur",
  ];
}
