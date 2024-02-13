import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminDialogComponent } from "../admin-dialog/admin-dialog.component";
import { AdminUserListDialogComponent } from "../poppup/admin-user-list-dialog/admin-user-list-dialog.component";

@Component({
  selector: "admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.css"],
})
export class AdminUserListComponent implements AfterViewInit {
  value: string = "";
  constructor(public dialog: MatDialog) {}

  applyFilter() {
    this.dataSource.filter = this.value.trim().toLowerCase();
  }
  clear() {
    this.value = "";
    this.applyFilter();
  }
  openDialogAddUser() {
    const dialogRef = this.dialog.open(AdminUserListDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
    "action",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminDialogComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  prenom: string;
  address: string;
  email: string;
  login: string;
  cin: string;
  roles: string;
  source: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: "Hydrogen",
    prenom: "Hyd",
    address: "H",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 2,
    name: "Helium",
    prenom: "Hyd",
    address: "He",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 3,
    name: "Lithium",
    prenom: "Hyd",
    address: "Li",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 4,
    name: "Beryllium",
    prenom: "Hyd",
    address: "Be",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 5,
    name: "Boron",
    prenom: "Hyd",
    address: "B",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 6,
    name: "Carbon",
    prenom: "Hyd",
    address: "C",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 7,
    name: "Nitrogen",
    prenom: "Hyd",
    address: "N",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 8,
    name: "Oxygen",
    prenom: "Hyd",
    address: "O",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 9,
    name: "Fluorine",
    prenom: "Hyd",
    address: "F",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 10,
    name: "Neon",
    prenom: "Hyd",
    address: "Ne",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 11,
    name: "Sodium",
    prenom: "Hyd",
    address: "Na",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 12,
    name: "Magnesium",
    prenom: "Hyd",
    address: "Mg",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 13,
    name: "Aluminum",
    prenom: "Hyd",
    address: "Al",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 14,
    name: "Silicon",
    prenom: "Hyd",
    address: "Si",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 15,
    name: "Phosphorus",
    prenom: "Hyd",
    address: "P",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 16,
    name: "Sulfur",
    prenom: "Hyd",
    address: "S",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 17,
    name: "Chlorine",
    prenom: "Hyd",
    address: "Cl",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 18,
    name: "Argon",
    prenom: "Hyd",
    address: "Ar",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 19,
    name: "Potassium",
    prenom: "Hyd",
    address: "K",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
  {
    position: 20,
    name: "Calcium",
    prenom: "Hyd",
    address: "Ca",
    email: "test@tets.com",
    login: "remotly",
    cin: "55555555555",
    roles: "user",
    source: "test",
  },
];
