import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import {
  NonNullableFormBuilder,
  Validators,
  FormGroup,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "admin-seance-list",
  templateUrl: "./admin-seance-list.component.html",
  styleUrls: ["./admin-seance-list.component.css"],
})
export class AdminSeanceListComponent implements AfterViewInit, OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formeseance = this.formBuilder.group({
      nom: ["", [Validators.required, Validators.minLength(3)]],
      lieu: ["", [Validators.required, Validators.minLength(3)]],
      link: ["", [Validators.required]],
      date: ["", [Validators.required]],
      comment: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  formeseance: FormGroup = new FormGroup({
    nom: new FormControl(""),
    lieu: new FormControl(""),
    link: new FormControl(""),
    date: new FormControl(""),
    comment: new FormControl(""),
  });
  public Addseance(e: Event) {
    this.submittedIn = true;

    if (this.formeseance.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formeseance.value);
    this.formeseance.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formeseance.controls;
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
}

interface comment {
  value: string;
  viewValue: string;
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
