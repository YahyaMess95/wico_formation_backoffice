import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { AdminFormationDialogComponent } from "../poppup/admin-formation-dialog/admin-formation-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "admin-formation-list",
  templateUrl: "./admin-formation-list.component.html",
  styleUrls: ["./admin-formation-list.component.css"],
})
export class AdminFormationListComponent implements AfterViewInit {
  displayedColumns: string[] = ["position", "nom", "description", "tags"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialogAddFormation() {
    const dialogRef = this.dialog.open(AdminFormationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

interface comment {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  nom: string;
  position: number;
  description: string;
  tags: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    nom: "Hydrogen",
    tags: "meet.com",
    description: "H",
  },
  {
    position: 2,
    nom: "Helium",
    tags: "meet.com",
    description: "He",
  },
  {
    position: 3,
    nom: "Lithium",
    tags: "meet.com",
    description: "Li",
  },
  {
    position: 4,
    nom: "Beryllium",
    tags: "meet.com",
    description: "Be",
  },
  {
    position: 5,
    nom: "Boron",
    tags: "meet.com",
    description: "B",
  },
  {
    position: 6,
    nom: "Carbon",
    tags: "meet.com",
    description: "C",
  },
  {
    position: 7,
    nom: "Nitrogen",
    tags: "meet.com",
    description: "N",
  },
  {
    position: 8,
    nom: "Oxygen",
    tags: "meet.com",
    description: "O",
  },
  {
    position: 9,
    nom: "Fluorine",
    tags: "meet.com",
    description: "F",
  },
  {
    position: 10,
    nom: "Neon",
    tags: "meet.com",
    description: "Ne",
  },
  {
    position: 11,
    nom: "Sodium",
    tags: "meet.com",
    description: "Na",
  },
  {
    position: 12,
    nom: "Magnesium",
    tags: "meet.com",
    description: "Mg",
  },
  {
    position: 13,
    nom: "Aluminum",
    tags: "meet.com",
    description: "Al",
  },
  {
    position: 14,
    nom: "Silicon",
    tags: "meet.com",
    description: "Si",
  },
  {
    position: 15,
    nom: "Phosphorus",
    tags: "meet.com",
    description: "P",
  },
  {
    position: 16,
    nom: "Sulfur",
    tags: "meet.com",
    description: "S",
  },
  {
    position: 17,
    nom: "Chlorine",
    tags: "meet.com",
    description: "Cl",
  },
  {
    position: 18,
    nom: "Argon",
    tags: "meet.com",
    description: "Ar",
  },
  {
    position: 19,
    nom: "Potassium",
    tags: "meet.com",
    description: "K",
  },
  {
    position: 20,
    nom: "Calcium",
    tags: "meet.com",
    description: "Ca",
  },
];
