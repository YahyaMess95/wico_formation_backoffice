import { AfterViewInit, Component, ViewChild } from "@angular/core";
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
export class AdminUserListComponent implements AfterViewInit {
  value: string = "";
  isLoading: boolean = true;
  photoData: any;
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalUsers: number = 0;

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
      this.isLoading = true;
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

  dataSource = new MatTableDataSource<TableColumn>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyCustomStyles: boolean = true;

  toggleCustomStyles() {
    this.applyCustomStyles = !this.applyCustomStyles;
  }

  ngAfterViewInit() {
    this.getAllUsers();
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminUserListDialogComponent, {
      data: data,
    });
    dialogRef.componentInstance.userAdded.subscribe(() => {
      this.isLoading = true;
      this.getAllUsers();
    });
  }

  openDetails(element: any) {
    const newKeys = [
      "_id",
      "sessions",
      "tokens",
      "Nom",
      "Prénom",
      "Adresse",
      "E-mail",
      "Login",
      "password",
      "Cin",
      "Rôle",
      "Source",
      "photo",
      "Date de création",
      "updatedAt",
      "__v",
    ];
    const userdetails = {};

    Object.keys(element).forEach((key, index) => {
      const newKey = newKeys[index] || key;
      userdetails[newKey] = element[key];
    });

    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: userdetails,
    });
    console.log("Details for:", userdetails);
  }
  onPageChange(event: any) {
    this.isLoading = true;
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllUsers();
  }
  getAllUsers() {
    this.adminService.getAllUsers(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.isLoading = true;
        if (
          response &&
          response.users.users &&
          Array.isArray(response.users.users)
        ) {
          const userPromises: Promise<any>[] = response.users.users.map(
            async (user: any) => {
              try {
                user.createdAt = new Date(user.createdAt).toLocaleDateString();
                return user;
              } catch (error) {
                console.error("Error fetching photo:", error);
                return user;
              }
            }
          );

          Promise.all(userPromises).then((updatedUsers) => {
            this.dataSource.data = updatedUsers;
            this.isLoading = false;
          });
          this.totalUsers = response.users.totalCount;
        } else {
          console.error("Invalid response format:", response);
        }
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
      "Etes-vous sûr de vouloir supprimer cet utilisateur ?",
      "confirm"
    );
    if (confirmed) {
      this.isLoading = true;
      this.adminService.removeUser(userId).subscribe(
        () => {
          this.getAllUsers();
          console.log("User removed successfully");
          this.notifService.showNotificationerror(
            "top",
            "center",
            "Utilisateur supprimé avec succès",
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
export interface TableColumn {
  name: string;
  prenom: string;
  email: string;
  roles: string;
  createdAt: string;
  action: string;
}
