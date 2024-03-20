import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSessionDialogComponent } from "../poppup/admin-session-dialog/admin-session-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionService } from "app/Services/session.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { NotifService } from "app/Services/notif.service";
import { FormationService } from "app/Services/formation.service";
import { SeanceService } from "app/Services/seance.service";

@Component({
  selector: "admin-session-list",
  templateUrl: "./admin-session-list.component.html",
  styleUrls: ["./admin-session-list.component.css"],
})
export class AdminSessionListComponent implements AfterViewInit {
  value: string = "";
  isLoading: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;
  formationidList;
  formationnameList;
  seancesidList;
  seancesnameList;
  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private seanceService: SeanceService,
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

  displayedColumns: string[] = [
    "name",
    "datedeb",
    "maxNbr",
    "type",
    "createdAt",
    "action",
  ];
  dataSource = new MatTableDataSource<TableColumn>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.getAllSessions();
  }

  openDialogAddSession() {
    const dialogRef = this.dialog.open(AdminSessionDialogComponent);

    dialogRef.componentInstance.sessionAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllSessions();
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminSessionDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.sessionAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllSessions();
    });
  }

  openDetails(element: any) {
    const newKeys = [
      "_id",
      "Formations",
      "Seances",
      "Nom",
      "Date de début",
      "Type",
      "Organisation",
      "Nombre maximum",
      "photo",
      "Date de création",
      "updatedAt",
      "__v",
    ];
    const sessiondetails = {};

    Object.keys(element).forEach((key, index) => {
      const newKey = newKeys[index] || key;
      if (key === "formations") {
        sessiondetails[newKey] = this.formationnameList;
      } else if (key === "seances") {
        sessiondetails[newKey] = this.seancesnameList;
      } else {
        sessiondetails[newKey] = element[key];
      }
    });

    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: sessiondetails,
    });
  }

  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllSessions();
  }

  getAllSessions() {
    this.sessionService
      .getAllSessions(this.currentPage, this.pageSize)
      .subscribe(
        (response) => {
          this.isLoading = true;
          if (
            response &&
            response.session.results &&
            Array.isArray(response.session.results)
          ) {
            this.formationidList = [];
            this.formationnameList = [];
            this.seancesidList = [];
            this.seancesnameList = [];
            const sessionPromises: Promise<any>[] =
              response.session.results.map(async (session: any) => {
                try {
                  session.formations.forEach((formation) => {
                    this.formationService.getOneFormation(formation).subscribe({
                      next: (formationData: any) => {
                        this.formationnameList.push(
                          formationData.formation.name
                        );
                        this.formationidList.push(formationData.formation._id);
                      },
                      error: (error: any) => {
                        console.error(
                          `Error retrieving formation with ID ${formation.id}:`,
                          error
                        );
                      },
                    });
                  });
                  session.seances.forEach((seances) => {
                    this.seanceService.getOneSeances(seances).subscribe({
                      next: (seancesData: any) => {
                        this.seancesnameList.push(seancesData.seance.name);
                        this.seancesidList.push(seancesData.seance._id);
                      },
                      error: (error: any) => {
                        console.error(
                          `Error retrieving seances with ID ${seances.id}:`,
                          error
                        );
                      },
                    });
                  });
                  session.formations = this.formationidList;
                  session.seances = this.seancesidList;
                  session.datedeb = new Date(
                    session.datedeb
                  ).toLocaleDateString();
                  session.createdAt = new Date(
                    session.createdAt
                  ).toLocaleDateString();
                  return session;
                } catch (error) {
                  console.error("Error fetching photo:", error);
                  return session; // Return the session object even if there's an error
                }
              });

            Promise.all(sessionPromises).then((updatedSessions) => {
              this.dataSource.data = updatedSessions;
              this.isLoading = false;
            });
            this.totalUsers = response.session.totalCount;
            console.log("totalUsers: " + this.totalUsers);
          } else {
            console.error("Invalid response format:", response);
          }
        },
        (error) => {
          console.error("Error fetching sessions:", error);
        }
      );
  }

  async removeSession(sessionId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Etes-vous sûr de vouloir supprimer cette session ?",
      "confirm"
    );
    if (confirmed) {
      this.isLoading = true;
      this.sessionService.removeSession(sessionId).subscribe(
        () => {
          this.getAllSessions();
          console.log("Session removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Session supprimée avec succès",
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
  organisation: string;
  maxNbr: number;
  type: string;
  createdAt: string;
}
