import { Component, OnInit } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { NotifService } from "app/Services/notif.service";
import { PhotoService } from "app/Services/photo.service";
import { UserService } from "app/Services/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  submittedIn = false;
  fileName = "";
  user: any;
  urlphoto;
  photo: string;
  isLoading: boolean = true;
  showUploadZone: boolean = false;
  isLoadingphoto: boolean = false;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService,
    private photoService: PhotoService,
    private notifService: NotifService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();

    this.formeusers = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      prenom: ["", [Validators.required, Validators.minLength(3)]],
      address: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      login: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      cin: ["", [Validators.required, Validators.minLength(8)]],
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
    source: new FormControl(""),
  });

  get fI(): { [key: string]: AbstractControl } {
    return this.formeusers.controls;
  }

  getUserDetails(): void {
    this.userService.getOneUsers().subscribe(
      (data) => {
        this.getUserPhoto(data.user.photo);
        this.user = data.user;
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching user details:", error);
        this.isLoading = false;
      }
    );
  }

  getUserPhoto(urlphoto): void {
    if (urlphoto) {
      this.photoService.getPhoto(urlphoto).subscribe(
        (photoData: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.photo = reader.result as string;
          };
          reader.readAsDataURL(photoData);
        },
        (error) => {
          console.error("Error fetching user photo:", error);

          // Handle error gracefully
        }
      );
    }
  }

  updateUser(): void {
    this.isLoading = true;
    const _id = this.user._id;
    const userDetails = this.formeusers.value;

    const formData = new FormData();

    Object.keys(userDetails).forEach((key) => {
      formData.append(key, userDetails[key]);
    });

    formData.append("_id", _id);

    this.userService.updateUser(formData).subscribe(
      (response) => {
        console.log("User updated successfully", response);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "L'utilisateur a été mis à jour avec succès",
          "success"
        );

        this.getUserDetails();
      },
      (error) => {
        this.isLoading = false;
        console.error("Échec de la mise à jour utilisateur", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Échec de la mise à jour utilisateur",
          "danger"
        );
      }
    );
  }
  //  image change
  toggleUploadZone() {
    this.showUploadZone = !this.showUploadZone;
  }

  selectFile() {
    // Trigger click on the file input
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.handleFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    this.handleFile(file);
  }

  handleFile(file: File) {
    this.isLoadingphoto = true;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("_id", this.user._id);
    this.photoService.updatePhoto(formData).subscribe(
      (response) => {
        if (response && response["user"].photo) {
          this.getUserPhoto(response["user"].photo);
          this.isLoadingphoto = false;
          this.showUploadZone = false; // Hide the upload zone after file selection
          this.notifService.showNotificationerror(
            "top",
            "center",
            "La photo a été mis à jour avec succès",
            "success"
          );
        } else {
          this.isLoading = false;
          console.error("Response does not contain the image id.");
        }
      },
      (error) => {
        console.error("Error uploading file:", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Erreur lors du téléchargement du fichier",
          "danger"
        );
        // Handle error as needed
      }
    );
  }
}
