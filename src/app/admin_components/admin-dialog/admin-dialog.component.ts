import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "admin-dialog",
  templateUrl: "./admin-dialog.component.html",
  styleUrls: ["./admin-dialog.component.css"],
})
export class AdminDialogComponent implements OnInit {
  dialogTitle: string;
  photoData: any;
  Cv: any;
  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data?.dialogTitle;
    this.photoData = this.data?.photo;
    this.Cv = this.data?.Cv;
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

  ngOnInit(): void {}
}
