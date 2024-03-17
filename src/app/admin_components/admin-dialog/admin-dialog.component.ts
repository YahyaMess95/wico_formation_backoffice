import { AfterViewInit, Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhotoService } from "app/Services/photo.service";

@Component({
  selector: "admin-dialog",
  templateUrl: "./admin-dialog.component.html",
  styleUrls: ["./admin-dialog.component.css"],
})
export class AdminDialogComponent implements AfterViewInit {
  isLoading: boolean = true;
  dialogTitle: string;
  userId: any;
  photo: string;
  urlphoto;
  Cv: any;
  constructor(
    private photoService: PhotoService,
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data?.dialogTitle;
    this.urlphoto = this.data?.photo;
    this.Cv = this.data?.Cv;
  }
  ngAfterViewInit() {
    this.getUserPhoto();
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  confirmDialog(): void {
    this.dialogRef.close();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(
      (key) =>
        key !== "_id" &&
        key !== "__v" &&
        key !== "tokens" &&
        key !== "updatedAt" &&
        key !== "sessions" &&
        key !== "photo" &&
        key !== "Cv" &&
        key !== "password"
    );
  }
  getUserPhoto(): void {
    const filename = this.urlphoto.replace("uploads\\", "");
    this.photoService.getPhoto(filename).subscribe(
      (photoData: Blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.photo = reader.result as string;
        };
        reader.readAsDataURL(photoData);
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching user photo:", error);
        this.isLoading = false;
        // Handle error gracefully
      }
    );
  }
}
