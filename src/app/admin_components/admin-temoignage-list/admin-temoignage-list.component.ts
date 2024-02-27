import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminTemoignageDialogComponent } from "../poppup/admin-temoignage-dialog/admin-temoignage-dialog.component";
import { TemoignageService } from "app/Services/temoignage.service";
import { NotifService } from "app/Services/notif.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";

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
    private notifService: NotifService
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
        const temoignages: PeriodicElement[] = response.temoignage.map(
          (temoignage: any, index: number) => ({
            ...temoignage,
            createdAt: new Date(temoignage.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = temoignages;
        this.isLoading = false;
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
      "Are you sure you want to remove this User ?",
      "wico"
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
