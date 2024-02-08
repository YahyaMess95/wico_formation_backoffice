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

@Component({
  selector: "admin-temoignage-list",
  templateUrl: "./admin-temoignage-list.component.html",
  styleUrls: ["./admin-temoignage-list.component.css"],
})
export class AdminTemoignageListComponent implements AfterViewInit, OnInit {
  submittedIn = false;
  constructor(private formBuilder: NonNullableFormBuilder) {}
  ngOnInit(): void {
    this.formetemoignages = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      prenom: ["", [Validators.required, Validators.minLength(3)]],
      source: ["", [Validators.required, Validators.minLength(6)]],
      mention: ["", [Validators.required, Validators.minLength(6)]],
      competence: ["", [Validators.required, Validators.minLength(6)]],
      domain: ["", [Validators.required, Validators.minLength(6)]],
      comment: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  formetemoignages: FormGroup = new FormGroup({
    name: new FormControl(""),
    prenom: new FormControl(""),
    source: new FormControl(""),
    mention: new FormControl(""),
    competence: new FormControl(""),
    domain: new FormControl(""),
    comment: new FormControl(""),
  });
  public Addtemoignage(e: Event) {
    this.submittedIn = true;

    if (this.formetemoignages.invalid) {
      return;
    }
    e.preventDefault();
    console.log(this.formetemoignages.value);
    this.formetemoignages.reset();
  }
  get fI(): { [key: string]: AbstractControl } {
    return this.formetemoignages.controls;
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

  fileName = "";

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);
    }
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
