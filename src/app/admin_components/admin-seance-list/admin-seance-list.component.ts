import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSeanceDialogComponent } from "../poppup/admin-seance-dialog/admin-seance-dialog.component";
import { SeanceService } from "app/Services/seance.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-seance-list",
  templateUrl: "./admin-seance-list.component.html",
  styleUrls: ["./admin-seance-list.component.css"],
})
export class AdminSeanceListComponent implements AfterViewInit, OnInit {
  value: string = "";
  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private seanceService: SeanceService,
    private notifService: NotifService
  ) {}

  ngOnInit() {
    this.getAllSeances();
  }

  applyFilter() {
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
  clear() {
    this.value = "";
    this.applyFilter();
  }

  displayedColumns: string[] = ["name", "lieu", "link", "date", "action"];

  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogAddSeance() {
    const dialogRef = this.dialog.open(AdminSeanceDialogComponent);

    dialogRef.componentInstance.seanceAdded.subscribe(() => {
      this.getAllSeances();
    });
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminSeanceDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.seanceAdded.subscribe(() => {
      this.getAllSeances();
    });
  }

  openDetails(element: any) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: element,
    });
    console.log("Details for:", element);
  }

  getAllSeances() {
    this.seanceService.getAllSeances().subscribe(
      (response) => {
        console.log(response.seance);
        const seances: PeriodicElement[] = response.seance.map(
          (seance: any, index: number) => ({
            ...seance,
            createdAt: new Date(seance.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = seances;
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching seances:", error);
      }
    );
  }

  async removeSeance(sessionId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Are you sure you want to remove this Seance ?",
      "confirm"
    );
    if (confirmed) {
      this.seanceService.removeSeance(sessionId).subscribe(
        () => {
          this.getAllSeances();
          console.log("Seance removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Seance deleted successful",
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
}

export interface PeriodicElement {
  name: string;
  lieu: string;
  link: string;
  date: string;
  createdAt: string;
}
