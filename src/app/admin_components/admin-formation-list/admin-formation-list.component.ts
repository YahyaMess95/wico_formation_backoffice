import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminFormationDialogComponent } from "../poppup/admin-formation-dialog/admin-formation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FormationService } from "app/Services/formation.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-formation-list",
  templateUrl: "./admin-formation-list.component.html",
  styleUrls: ["./admin-formation-list.component.css"],
})
export class AdminFormationListComponent implements AfterViewInit {
  value: string = "";
  isLoading: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;

  displayedColumns: string[] = ["name", "description", "tags", "action"];
  dataSource = new MatTableDataSource<TableColumn>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.getAllFormations();
  }

  constructor(
    public dialog: MatDialog,
    private formationService: FormationService,
    private notifService: NotifService
  ) {}

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
      this.isLoading = true;
      this.getAllFormations();
    });
  }
  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminFormationDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.formationAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllFormations();
    });
  }

  openDetails(element: any) {
    const newKeys = [
      "_id",
      "Contenus",
      "Nom",
      "Description",
      "Mots clés",
      "Date de création",
      "updatedAt",
      "__v",
    ];
    const formationdetails = {};

    Object.keys(element).forEach((key, index) => {
      const newKey = newKeys[index] || key;
      formationdetails[newKey] = element[key];
    });
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: formationdetails,
    });
    console.log("Details for:", element);
  }
  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllFormations();
  }
  getAllFormations() {
    this.formationService
      .getAllFormations(this.currentPage, this.pageSize)
      .subscribe(
        (response) => {
          if (
            response &&
            response.formation.results &&
            Array.isArray(response.formation.results)
          ) {
            console.log(response.formation);
            const formations: TableColumn[] = response.formation.results.map(
              (formation: any, index: number) => ({
                ...formation,
                createdAt: new Date(formation.createdAt).toLocaleDateString(), // Format date
              })
            );

            this.dataSource.data = formations;
            this.isLoading = false;
            this.totalUsers = response.formation.totalCount;
          } else {
            console.error("Invalid response format:", response);
          }
        },
        (error) => {
          console.error("Error fetching formations:", error);
        }
      );
  }

  async removeFormation(sessionId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Êtes-vous sûr de vouloir supprimer cette formation ?",
      "confirm"
    );
    if (confirmed) {
      this.isLoading = true;
      this.formationService.removeFormation(sessionId).subscribe(
        () => {
          this.getAllFormations();
          console.log("Formation removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Formation supprimée avec succès",
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
  description: string;
  tags: string;
}
