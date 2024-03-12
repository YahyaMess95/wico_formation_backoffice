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
export class AdminSeanceListComponent implements AfterViewInit {
  value: string = "";
  isLoading: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;

  constructor(
    public dialog: MatDialog,
    private seanceService: SeanceService,
    private notifService: NotifService
  ) {}

  applyFilter() {
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
  clear() {
    this.value = "";
    this.applyFilter();
  }

  displayedColumns: string[] = ["name", "lieu", "link", "date", "action"];

  dataSource = new MatTableDataSource<TableColumn>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.getAllSeances();
  }

  openDialogAddSeance() {
    const dialogRef = this.dialog.open(AdminSeanceDialogComponent);

    dialogRef.componentInstance.seanceAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllSeances();
    });
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminSeanceDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.seanceAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllSeances();
    });
  }

  openDetails(element: any) {
    const newKeys = [
      "_id",
      "Nom",
      "Date",
      "Lieu",
      "Lien",
      "Commentaire",
      "Date de création",
      "updatedAt",
      "__v",
    ];
    const seancedetails = {};

    Object.keys(element).forEach((key, index) => {
      const newKey = newKeys[index] || key;
      seancedetails[newKey] = element[key];
    });

    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: seancedetails,
    });
  }
  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllSeances();
  }
  getAllSeances() {
    this.seanceService.getAllSeances(this.currentPage, this.pageSize).subscribe(
      (response) => {
        if (
          response &&
          response.seance.results &&
          Array.isArray(response.seance.results)
        ) {
          const seances: TableColumn[] = response.seance.results.map(
            (seance: any, index: number) => ({
              ...seance,
              date: new Date(seance.date).toLocaleDateString(),
              createdAt: new Date(seance.createdAt).toLocaleDateString(), // Format date
            })
          );

          this.dataSource.data = seances;
          this.isLoading = false;

          this.totalUsers = response.seance.totalCount;
        } else {
          console.error("Invalid response format:", response);
        }
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
      "Êtes-vous sûr de vouloir supprimer cette séance ?",
      "confirm"
    );
    if (confirmed) {
      this.isLoading = true;
      this.seanceService.removeSeance(sessionId).subscribe(
        () => {
          this.getAllSeances();
          console.log("Seance removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Séance supprimée avec succès",
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

export interface TableColumn {
  name: string;
  lieu: string;
  link: string;
  date: string;
  createdAt: string;
}
