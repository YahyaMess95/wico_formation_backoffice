import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminFormationDialogComponent } from "../poppup/admin-formation-dialog/admin-formation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { FormationService } from "app/Services/formation.service";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-formation-list",
  templateUrl: "./admin-formation-list.component.html",
  styleUrls: ["./admin-formation-list.component.css"],
})
export class AdminFormationListComponent implements AfterViewInit, OnInit {
  value: string = "";

  displayedColumns: string[] = [
    "position",
    "name",
    "description",
    "tags",
    "action",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private formationService: FormationService,
    private notifService: NotifService
  ) {}
  ngOnInit() {
    this.getAllFormations();
  }
  applyFilter() {
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
  clear() {
    this.value = "";
    this.applyFilter();
  }

  openDialogAddFormation() {
    const dialogRef = this.dialog.open(AdminFormationDialogComponent);

    dialogRef.componentInstance.formationAdded.subscribe(() => {
      this.getAllFormations();
    });
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminFormationDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.formationAdded.subscribe(() => {
      this.getAllFormations();
    });
  }

  getAllFormations() {
    this.formationService.getAllFormations().subscribe(
      (response) => {
        console.log(response.formation);
        const formations: PeriodicElement[] = response.formation.map(
          (formation: any, index: number) => ({
            ...formation,
            position: index + 1, // Incremental numbering
            createdAt: new Date(formation.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = formations;
      },
      (error) => {
        console.error("Error fetching formations:", error);
      }
    );
  }

  removeFormation(sessionId: string) {
    this.formationService.removeFormation(sessionId).subscribe(
      () => {
        this.getAllFormations();
        console.log("Formation removed successfully");
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Formation deleted successful",
          "success"
        );
      },
      (error) => {
        console.error("Error removing session:", error);
        this.notifService.showNotificationerror(
          "top",
          "center",
          error,
          "danger"
        );
      }
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  description: string;
  tags: string;
}
