import { AfterViewInit, Component, ViewChild } from "@angular/core";

import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSessionDialogComponent } from "../poppup/admin-session-dialog/admin-session-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "admin-session-list",
  templateUrl: "./admin-session-list.component.html",
  styleUrls: ["./admin-session-list.component.css"],
})
export class AdminSessionListComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  displayedColumns: string[] = [
    "position",
    "nom",
    "datedeb",
    "organisation",
    "maxbumbr",
    "type",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogAddSession() {
    const dialogRef = this.dialog.open(AdminSessionDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface PeriodicElement {
  nom: string;
  position: number;
  datedeb: string;
  organisation: string;
  maxbumbr: number;
  type: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    nom: "Hydrogen",
    datedeb: "16/05/2024",
    organisation: "H",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 2,
    nom: "Helium",
    datedeb: "16/05/2024",
    organisation: "He",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 3,
    nom: "Lithium",
    datedeb: "16/05/2024",
    organisation: "Li",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 4,
    nom: "Beryllium",
    datedeb: "16/05/2024",
    organisation: "Be",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 5,
    nom: "Boron",
    datedeb: "16/05/2024",
    organisation: "B",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 6,
    nom: "Carbon",
    datedeb: "16/05/2024",
    organisation: "C",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 7,
    nom: "Nitrogen",
    datedeb: "16/05/2024",
    organisation: "N",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 8,
    nom: "Oxygen",
    datedeb: "16/05/2024",
    organisation: "O",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 9,
    nom: "Fluorine",
    datedeb: "16/05/2024",
    organisation: "F",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 10,
    nom: "Neon",
    datedeb: "16/05/2024",
    organisation: "Ne",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 11,
    nom: "Sodium",
    datedeb: "16/05/2024",
    organisation: "Na",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 12,
    nom: "Magnesium",
    datedeb: "16/05/2024",
    organisation: "Mg",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 13,
    nom: "Aluminum",
    datedeb: "16/05/2024",
    organisation: "Al",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 14,
    nom: "Silicon",
    datedeb: "16/05/2024",
    organisation: "Si",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 15,
    nom: "Phosphorus",
    datedeb: "16/05/2024",
    organisation: "P",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 16,
    nom: "Sulfur",
    datedeb: "16/05/2024",
    organisation: "S",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 17,
    nom: "Chlorine",
    datedeb: "16/05/2024",
    organisation: "Cl",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 18,
    nom: "Argon",
    datedeb: "16/05/2024",
    organisation: "Ar",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 19,
    nom: "Potassium",
    datedeb: "16/05/2024",
    organisation: "K",
    maxbumbr: 5,
    type: "remotly",
  },
  {
    position: 20,
    nom: "Calcium",
    datedeb: "16/05/2024",
    organisation: "Ca",
    maxbumbr: 5,
    type: "remotly",
  },
];
