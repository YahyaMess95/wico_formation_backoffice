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
export class AdminTemoignageListComponent implements AfterViewInit {
  value: string = "";
  isLoading: boolean = true;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;

  dataSource = new MatTableDataSource<TableColumn>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private temoignageService: TemoignageService,
    private notifService: NotifService,
    private sanitizer: DomSanitizer,
    private photoService: PhotoService
  ) {}
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

  ngAfterViewInit() {
    this.getAllTemoignages();
  }
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
      this.isLoading = true;
      this.getAllTemoignages();
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminTemoignageDialogComponent, {
      data: data,
    });

    dialogRef.componentInstance.temoignageAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllTemoignages();
    });
  }

  openDetails(element: any) {
    const newKeys = [
      "_id",
      "Nom",
      "Prénom",
      "Source",
      "Mention",
      "Compétence",
      "Domain",
      "Commentaire",
      "photo",
      "Cv",
      "Date de création",
      "updatedAt",
      "__v",
    ];
    const temoignagedetails = {};

    Object.keys(element).forEach((key, index) => {
      const newKey = newKeys[index] || key;
      temoignagedetails[newKey] = element[key];
    });

    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: temoignagedetails,
    });
  }

  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllTemoignages();
  }

  getAllTemoignages() {
    this.temoignageService
      .getAllTemoignages(this.currentPage, this.pageSize)
      .subscribe(
        (response) => {
          const temoignagePromises: Promise<any>[] =
            response.temoignage.results.map(async (temoignage: any) => {
              try {
                temoignage.createdAt = new Date(
                  temoignage.createdAt
                ).toLocaleDateString();
                return temoignage;
              } catch (error) {
                console.error("Error fetching photo:", error);
                return temoignage; // Return the temoignage object even if there's an error
              }
            });

          Promise.all(temoignagePromises).then((updatedtemoignages) => {
            this.dataSource.data = updatedtemoignages;
            this.isLoading = false;
          });
          this.totalUsers = response.temoignage.totalCount;
        },
        (error) => {
          console.error("Error fetching temoignages:", error);
        }
      );
  }

  async removeTemoignage(temoignageId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
      "confirm"
    );
    if (confirmed) {
      this.isLoading = true;
      this.temoignageService.removeTemoignage(temoignageId).subscribe(
        () => {
          this.getAllTemoignages();
          console.log("User removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Utilisateur supprimé avec succès",
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

export interface TableColumn {
  name: string;
  prenom: string;
  source: string;
  mention: string;
  competence: string;
  domain: string;
  cv: string;
}
