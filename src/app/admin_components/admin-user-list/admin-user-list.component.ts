import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminUserListDialogComponent } from "../poppup/admin-user-list-dialog/admin-user-list-dialog.component";
import { AdminService } from "app/Services/admin.service";
import { NotifService } from "app/Services/notif.service";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";

@Component({
  selector: "admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.css"],
})
export class AdminUserListComponent implements AfterViewInit, OnInit {
  value: string = "";
  isLoading: boolean = true;
  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private notifService: NotifService
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
        const users: PeriodicElement[] = response.user.map(
          (user: any, index: number) => ({
            ...user,
            createdAt: new Date(user.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = users;
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
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
  prename: string;
  email: string;
  roles: string;
  createdAt: string;
}
