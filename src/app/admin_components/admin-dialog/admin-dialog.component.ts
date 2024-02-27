import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "admin-dialog",
  templateUrl: "./admin-dialog.component.html",
  styleUrls: ["./admin-dialog.component.css"],
})
export class AdminDialogComponent implements OnInit {
  dialogTitle: string;
  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data.dialogTitle;
    this.updateColumns();
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
        key !== "updatedAt"
    );
  }

  isObject(val: any): boolean {
    return val instanceof Object;
  }
  ngOnInit(): void {}
  columnClass: string = "column-3"; // Default to 3 columns
  @HostListener("window:resize", ["$event"])
  onResize(event: any) {
    this.updateColumns();
  }

  updateColumns() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.columnClass = "column-1";
    } else if (screenWidth < 992) {
      this.columnClass = "column-2";
    } else {
      this.columnClass = "column-3";
    }
  }
}
