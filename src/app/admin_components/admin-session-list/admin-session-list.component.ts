import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSessionDialogComponent } from "../poppup/admin-session-dialog/admin-session-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionService } from "app/Services/session.service";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-session-list",
  templateUrl: "./admin-session-list.component.html",
  styleUrls: ["./admin-session-list.component.css"],
})
export class AdminSessionListComponent implements AfterViewInit, OnInit {
  value: string = "";
  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private notifService: NotifService
  ) {}

  ngOnInit() {
    this.getAllSessions();
  }
  applyFilter() {
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
  clear() {
    this.value = "";
    this.applyFilter();
  }

  displayedColumns: string[] = [
    "position",
    "name",
    "datedeb",
    "organisation",
    "maxNbr",
    "type",
    "createdAt",
    "action",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogAddSession() {
    const dialogRef = this.dialog.open(AdminSessionDialogComponent);

    dialogRef.componentInstance.sessionAdded.subscribe(() => {
      this.getAllSessions();
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminSessionDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.sessionAdded.subscribe(() => {
      this.getAllSessions();
    });
  }

  getAllSessions() {
    this.sessionService.getAllSessions().subscribe(
      (response) => {
        console.log(response.session);
        const sessions: PeriodicElement[] = response.session.map(
          (session: any, index: number) => ({
            ...session,
            position: index + 1, // Incremental numbering
            createdAt: new Date(session.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = sessions;
      },
      (error) => {
        console.error("Error fetching sessions:", error);
      }
    );
  }

  removeSession(sessionId: string) {
    this.sessionService.removeSession(sessionId).subscribe(
      () => {
        this.getAllSessions();
        console.log("Session removed successfully");
        this.notifService.showNotificationerror(
          "top",
          "center",
          "Session deleted successful",
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
  datedeb: string;
  organisation: string;
  maxNbr: number;
  type: string;
  createdAt: string;
}
