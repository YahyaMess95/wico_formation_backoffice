import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminTemoignageDialogComponent } from "../poppup/admin-temoignage-dialog/admin-temoignage-dialog.component";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { TemoignageService } from "app/Services/temoignage.service";
import { NotifService } from "app/Services/notif.service";

@Component({
  selector: "admin-temoignage-list",
  templateUrl: "./admin-temoignage-list.component.html",
  styleUrls: ["./admin-temoignage-list.component.css"],
})
export class AdminTemoignageListComponent implements AfterViewInit, OnInit {
  value: string = "";
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
    "position",
    "name",
    "prenom",
    "source",
    "mention",
    "competences",
    "domaine",
    "comment",
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

  ngOnInit() {
    this.getAllTemoignages();
  }

  getAllTemoignages() {
    this.temoignageService.getAllTemoignages().subscribe(
      (response) => {
        const temoignages: PeriodicElement[] = response.temoignage.map(
          (temoignage: any, index: number) => ({
            ...temoignage,
            position: index + 1, // Incremental numbering
            createdAt: new Date(temoignage.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = temoignages;
      },
      (error) => {
        console.error("Error fetching temoignages:", error);
      }
    );
  }

  removeTemoignage(temoignageId: string) {
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

export interface PeriodicElement {
  name: string;
  position: number;
  prenom: string;
  source: string;
  mention: string;
  competence: string;
  domain: string;
  comment: string;
  cv: string;
}
