import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotifService } from "app/Services/notif.service";
import { UserService } from "app/Services/user.service";

@Component({
  selector: "admin-user-list-dialog",
  templateUrl: "./admin-user-list-dialog.component.html",
  styleUrls: ["./admin-user-list-dialog.component.css"],
})
export class AdminUserListDialogComponent implements OnInit {
  @Output() userAdded: EventEmitter<void> = new EventEmitter<void>();
  submittedIn = false;

  constructor(
    private notifService: NotifService,
    private userService: UserService,
    private dialogRef: MatDialogRef<AdminUserListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    if (file) {
      this.formeusers.patchValue({
        photo: file.name,
      });

      const formData = new FormData();
      formData.append("photo", file);
    }
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
      sessions: new FormControl(this.data?.sessions || []),
      photo: new FormControl(this.data?.photo || "", [Validators.required]),
    });
  }

  public saveOrUpdateUser(): void {
    this.submittedIn = true;

    if (this.formeusers.invalid) {
      console.log("error ", this.formeusers.value);
      this.notifService.showNotificationerror(
        "top",
        "center",
        "Formulair invalid",
        "danger"
      );
      return;
    }

    const userDetails = this.formeusers.value;

    if (this.data) {
      this.updateUser(this.data._id, userDetails);
    } else {
      this.addUser(userDetails);
    }
  }

  addUser(userDetails): void {
    this.dialogRef.close();
    this.userService.addUser(userDetails).subscribe(
      (response) => {
        console.log("User added successful", response);
        this.formeusers.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "User added successful",
          "success"
        );
        this.userAdded.emit();
      },
      (error) => {
        console.error("User addition failed", error);
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
    this.dialogRef.close();
    this.userService.updateUser(_id, userDetails).subscribe(
      (response) => {
        console.log("User updated successfully", response);
        this.formeusers.reset();
        this.notifService.showNotificationerror(
          "top",
          "center",
          "User updated successfully",
          "success"
        );

        this.userAdded.emit();
      },
      (error) => {
        console.error("User update failed", error);
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
  roleList: string[] = ["User", "Trainer", "Student"];
}
