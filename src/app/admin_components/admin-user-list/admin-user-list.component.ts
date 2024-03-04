import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminUserListDialogComponent } from "../poppup/admin-user-list-dialog/admin-user-list-dialog.component";
import { AdminService } from "app/Services/admin.service";
import { NotifService } from "app/Services/notif.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { PhotoService } from "app/Services/photo.service";

@Component({
  selector: "admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.css"],
})
export class AdminUserListComponent implements AfterViewInit, OnInit {
  value: string = "";
  isLoading: boolean = true;
  photoData: any;
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
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
  openDialogAddUser() {
    const dialogRef = this.dialog.open(AdminUserListDialogComponent);

    dialogRef.componentInstance.userAdded.subscribe(() => {
      this.getAllUsers();
    });
  }

  displayedColumns: string[] = [
    "name",
    "prenom",
    "email",
    "roles",
    "createdAt",
    "action",
  ];

  dataSource = new MatTableDataSource<PeriodicElement>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getAllUsers();
  }
  applyCustomStyles: boolean = true;

  toggleCustomStyles() {
    this.applyCustomStyles = !this.applyCustomStyles;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminUserListDialogComponent, {
      data: data,
    });
    dialogRef.componentInstance.userAdded.subscribe(() => {
      this.getAllUsers();
    });
  }

  openDetails(element: any) {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: element,
    });
    console.log("Details for:", element);
  }

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (response) => {
        const userPromises: Promise<any>[] = response.user.map(
          async (user: any) => {
            try {
              const photoData = await this.fetchPhoto(user.photo);
              const imageUrl = this.getImageUrl(photoData);
              user.photo = imageUrl;
              user.createdAt = new Date(user.createdAt).toLocaleDateString();
              return user;
            } catch (error) {
              console.error("Error fetching photo:", error);
              return user; // Return the user object even if there's an error
            }
          }
        );

        Promise.all(userPromises).then((updatedUsers) => {
          this.dataSource.data = updatedUsers;
          this.isLoading = false;
        });
      },
      (error) => {
        console.error("Error fetching users:", error);
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
  async removeUser(userId: string) {
    const confirmed = await this.notifService.showNotificationconfirmation(
      "top",
      "center",
      "Are you sure you want to remove this User ?",
      "confirm"
    );
    if (confirmed) {
      this.adminService.removeUser(userId).subscribe(
        () => {
          this.getAllUsers();
          console.log("User removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "User deleted successful",
            "success"
          );
        },
        (error) => {
          console.error("Error removing user:", error);
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
  email: string;
  roles: string;
  createdAt: string;
  action: string;
}
