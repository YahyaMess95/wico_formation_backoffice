import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminSeanceDialogComponent } from "../poppup/admin-seance-dialog/admin-seance-dialog.component";

@Component({
  selector: "admin-seance-list",
  templateUrl: "./admin-seance-list.component.html",
  styleUrls: ["./admin-seance-list.component.css"],
})
export class AdminSeanceListComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  displayedColumns: string[] = [
    "position",
    "nom",
    "lieu",
    "link",
    "date",
    "comment",
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogAddSeance() {
    const dialogRef = this.dialog.open(AdminSeanceDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface PeriodicElement {
  nom: string;
  position: number;
  lieu: string;
  link: string;
  date: number;
  comment: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    nom: "Hydrogen",
    link: "meet.com",
    lieu: "H",
    date: 5,
    comment: "remotly",
  },
  {
    position: 2,
    nom: "Helium",
    link: "meet.com",
    lieu: "He",
    date: 5,
    comment: "remotly",
  },
  {
    position: 3,
    nom: "Lithium",
    link: "meet.com",
    lieu: "Li",
    date: 5,
    comment: "remotly",
  },
  {
    position: 4,
    nom: "Beryllium",
    link: "meet.com",
    lieu: "Be",
    date: 5,
    comment: "remotly",
  },
  {
    position: 5,
    nom: "Boron",
    link: "meet.com",
    lieu: "B",
    date: 5,
    comment: "remotly",
  },
  {
    position: 6,
    nom: "Carbon",
    link: "meet.com",
    lieu: "C",
    date: 5,
    comment: "remotly",
  },
  {
    position: 7,
    nom: "Nitrogen",
    link: "meet.com",
    lieu: "N",
    date: 5,
    comment: "remotly",
  },
  {
    position: 8,
    nom: "Oxygen",
    link: "meet.com",
    lieu: "O",
    date: 5,
    comment: "remotly",
  },
  {
    position: 9,
    nom: "Fluorine",
    link: "meet.com",
    lieu: "F",
    date: 5,
    comment: "remotly",
  },
  {
    position: 10,
    nom: "Neon",
    link: "meet.com",
    lieu: "Ne",
    date: 5,
    comment: "remotly",
  },
  {
    position: 11,
    nom: "Sodium",
    link: "meet.com",
    lieu: "Na",
    date: 5,
    comment: "remotly",
  },
  {
    position: 12,
    nom: "Magnesium",
    link: "meet.com",
    lieu: "Mg",
    date: 5,
    comment: "remotly",
  },
  {
    position: 13,
    nom: "Aluminum",
    link: "meet.com",
    lieu: "Al",
    date: 5,
    comment: "remotly",
  },
  {
    position: 14,
    nom: "Silicon",
    link: "meet.com",
    lieu: "Si",
    date: 5,
    comment: "remotly",
  },
  {
    position: 15,
    nom: "Phosphorus",
    link: "meet.com",
    lieu: "P",
    date: 5,
    comment: "remotly",
  },
  {
    position: 16,
    nom: "Sulfur",
    link: "meet.com",
    lieu: "S",
    date: 5,
    comment: "remotly",
  },
  {
    position: 17,
    nom: "Chlorine",
    link: "meet.com",
    lieu: "Cl",
    date: 5,
    comment: "remotly",
  },
  {
    position: 18,
    nom: "Argon",
    link: "meet.com",
    lieu: "Ar",
    date: 5,
    comment: "remotly",
  },
  {
    position: 19,
    nom: "Potassium",
    link: "meet.com",
    lieu: "K",
    date: 5,
    comment: "remotly",
  },
  {
    position: 20,
    nom: "Calcium",
    link: "meet.com",
    lieu: "Ca",
    date: 5,
    comment: "remotly",
  },
];
