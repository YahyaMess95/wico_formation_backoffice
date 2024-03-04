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
export class AdminSessionListComponent implements AfterViewInit, OnInit {
  value: string = "";
  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private notifService: NotifService,
    private sanitizer: DomSanitizer,
    private photoService: PhotoService
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
    "name",
    "datedeb",
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

  openDetails(element: any) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: element,
    });
    console.log("Details for:", element);
  }

  getAllSessions() {
    this.sessionService.getAllSessions().subscribe(
      (response) => {
        console.log(response.session);
        const userPromises: Promise<any>[] = response.session.map(
          async (session: any) => {
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
          }
        );

        Promise.all(userPromises).then((updatedSessions) => {
          this.dataSource.data = updatedSessions;
          this.isLoading = false;
        });
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
      "Are you sure you want to remove this Session ?",
      "confirm"
    );
    if (confirmed) {
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
}

export interface PeriodicElement {
  name: string;
  organisation: string;
  maxNbr: number;
  type: string;
  createdAt: string;
}
