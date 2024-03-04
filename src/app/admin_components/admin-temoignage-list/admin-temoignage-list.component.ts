import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminTemoignageDialogComponent } from "../poppup/admin-temoignage-dialog/admin-temoignage-dialog.component";
import { TemoignageService } from "app/Services/temoignage.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { NotifService } from "app/Services/notif.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PhotoService } from "app/Services/photo.service";

@Component({
  selector: "admin-temoignage-list",
  templateUrl: "./admin-temoignage-list.component.html",
  styleUrls: ["./admin-temoignage-list.component.css"],
})
export class AdminTemoignageListComponent implements AfterViewInit, OnInit {
  value: string = "";
  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private temoignageService: TemoignageService,
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

  openDialogAddTemoignage() {
    const dialogRef = this.dialog.open(AdminTemoignageDialogComponent);

    dialogRef.componentInstance.temoignageAdded.subscribe(() => {
      this.getAllTemoignages();
    });
  }
  displayedColumns: string[] = [
    "name",
    "prenom",
    "source",
    "mention",
    "competences",
    "domaine",
    "cv",
    "action",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminTemoignageDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.temoignageAdded.subscribe(() => {
      this.getAllTemoignages();
    });
  }

  openDetails(element: any) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: element,
    });
    console.log("Details for:", element);
  }

  ngOnInit() {
    this.getAllTemoignages();
  }

  getAllTemoignages() {
    this.temoignageService.getAllTemoignages().subscribe(
      (response) => {
        const temoignagePromises: Promise<any>[] = response.temoignage.map(
          async (temoignage: any) => {
            try {
              const photoData = await this.fetchPhoto(temoignage.photo);
              const imageUrl = this.getImageUrl(photoData);
              temoignage.photo = imageUrl;
              temoignage.createdAt = new Date(
                temoignage.createdAt
              ).toLocaleDateString();
              return temoignage;
            } catch (error) {
              console.error("Error fetching photo:", error);
              return temoignage; // Return the temoignage object even if there's an error
            }
          }
        );

        Promise.all(temoignagePromises).then((updatedtemoignages) => {
          this.dataSource.data = updatedtemoignages;
          this.isLoading = false;
        });
      },
      (error) => {
        console.error("Error fetching temoignages:", error);
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

  async removeTemoignage(temoignageId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Are you sure you want to remove this User ?",
      "confirm"
    );
    if (confirmed) {
      this.temoignageService.removeTemoignage(temoignageId).subscribe(
        () => {
          this.getAllTemoignages();
          console.log("User removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "User deleted successful",
            "success"
          );
        },
        (error) => {
          console.error("Error removing temoignage:", error);
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
  prenom: string;
  source: string;
  mention: string;
  competence: string;
  domain: string;
  cv: string;
}
