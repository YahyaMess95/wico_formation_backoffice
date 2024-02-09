import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminTemoignageDialogComponent } from "../poppup/admin-temoignage-dialog/admin-temoignage-dialog.component";

@Component({
  selector: "admin-temoignage-list",
  templateUrl: "./admin-temoignage-list.component.html",
  styleUrls: ["./admin-temoignage-list.component.css"],
})
export class AdminTemoignageListComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialogAddTemoignage() {
    const dialogRef = this.dialog.open(AdminTemoignageDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  displayedColumns: string[] = [
    "position",
    "name",
    "prenom",
    "source",
    "mention",
    "competence",
    "domain",
    "comment",
    "cv",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: "Hydrogen",
    prenom: "Hyd",
    source: "H",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 2,
    name: "Helium",
    prenom: "Hyd",
    source: "He",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 3,
    name: "Lithium",
    prenom: "Hyd",
    source: "Li",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 4,
    name: "Beryllium",
    prenom: "Hyd",
    source: "Be",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 5,
    name: "Boron",
    prenom: "Hyd",
    source: "B",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 6,
    name: "Carbon",
    prenom: "Hyd",
    source: "C",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 7,
    name: "Nitrogen",
    prenom: "Hyd",
    source: "N",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 8,
    name: "Oxygen",
    prenom: "Hyd",
    source: "O",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 9,
    name: "Fluorine",
    prenom: "Hyd",
    source: "F",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 10,
    name: "Neon",
    prenom: "Hyd",
    source: "Ne",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 11,
    name: "Sodium",
    prenom: "Hyd",
    source: "Na",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 12,
    name: "Magnesium",
    prenom: "Hyd",
    source: "Mg",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 13,
    name: "Aluminum",
    prenom: "Hyd",
    source: "Al",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 14,
    name: "Silicon",
    prenom: "Hyd",
    source: "Si",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 15,
    name: "Phosphorus",
    prenom: "Hyd",
    source: "P",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 16,
    name: "Sulfur",
    prenom: "Hyd",
    source: "S",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 17,
    name: "Chlorine",
    prenom: "Hyd",
    source: "Cl",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 18,
    name: "Argon",
    prenom: "Hyd",
    source: "Ar",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 19,
    name: "Potassium",
    prenom: "Hyd",
    source: "K",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
  {
    position: 20,
    name: "Calcium",
    prenom: "Hyd",
    source: "Ca",
    mention: "test@tets.com",
    competence: "remotly",
    domain: "55555555555",
    comment: "user",
    cv: "test",
  },
];
