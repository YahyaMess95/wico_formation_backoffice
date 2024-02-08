import { Component, Inject, OnInit } from "@angular/core";
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
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  isObject(val: any): boolean {
    return val instanceof Object;
  }
  ngOnInit(): void {}
}
