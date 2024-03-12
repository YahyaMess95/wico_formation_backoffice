import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSessionDialogComponent } from "../poppup/admin-session-dialog/admin-session-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SessionService } from "app/Services/session.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { NotifService } from "app/Services/notif.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PhotoService } from "app/Services/photo.service";

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

  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private notifService: NotifService,
    private sanitizer: DomSanitizer,
    private photoService: PhotoService
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
      sessiondetails[newKey] = element[key];
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
          if (
            response &&
            response.session.results &&
            Array.isArray(response.session.results)
          ) {
            const sessionPromises: Promise<any>[] =
              response.session.results.map(async (session: any) => {
                try {
                  const photoData = await this.fetchPhoto(session.photo);
                  const imageUrl = this.getImageUrl(photoData);
                  session.photo = imageUrl;
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

  fetchPhoto(photoName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.photoService.getPhoto(photoName).subscribe(
        (data) => {
          resolve(data); // Resolve the promise with the fetched photo data
        },
        (error) => {
          reject(error); // Reject the promise if there's an error
        }
      );
    });
  }
  getImageUrl(photoData: any): SafeUrl {
    // console.log("Received photoData:", photoData);

    if (photoData instanceof Blob) {
      // If photoData is already a Blob object, proceed with creating the URL
      const imageUrl = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(photoData)
      );
      return imageUrl;
    } else {
      console.error("Invalid photoData format:", photoData);
      return "";
    }
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
