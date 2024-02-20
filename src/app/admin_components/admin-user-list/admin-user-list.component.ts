import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { AdminUserListDialogComponent } from "../poppup/admin-user-list-dialog/admin-user-list-dialog.component";
import { AdminService } from "app/Services/admin.service";

@Component({
  selector: "admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.css"],
})
export class AdminUserListComponent implements AfterViewInit, OnInit {
  value: string = "";
  constructor(public dialog: MatDialog, private adminService: AdminService) {}

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
    "position",
    "name",
    "prenom",
    "address",
    "email",
    "login",
    "cin",
    "roles",
    "source",
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

  getAllUsers() {
    this.adminService.getAllUsers().subscribe(
      (response) => {
        const users: PeriodicElement[] = response.user.map(
          (user: any, index: number) => ({
            ...user,
            position: index + 1, // Incremental numbering
            createdAt: new Date(user.createdAt).toLocaleDateString(), // Format date
          })
        );

        this.dataSource.data = users;
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
  }

  removeUser(userId: string) {
    this.adminService.removeUser(userId).subscribe(
      () => {
        this.getAllUsers();
        console.log("User removed successfully");
        // Optionally, perform any additional actions after successful removal
      },
      (error) => {
        console.error("Error removing user:", error);
        // Handle error appropriately
      }
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  prename: string;
  addresse: string;
  email: string;
  login: string;
  cin: string;
  roles: string;
  source: string;
  createdAt: string;
}
