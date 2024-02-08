import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminDashboardComponent } from "app/admin_components/admin-dashboard/admin-dashboard.component";
import { AdminUserListComponent } from "app/admin_components/admin-user-list/admin-user-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ComponentsModule } from "app/components/components.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { AdminSessionListComponent } from "../../admin_components/admin-session-list/admin-session-list.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AdminSeanceListComponent } from "../../admin_components/admin-seance-list/admin-seance-list.component";
import { AdminFormationListComponent } from "../../admin_components/admin-formation-list/admin-formation-list.component";
import { AdminContenuListComponent } from "../../admin_components/admin-contenu-list/admin-contenu-list.component";
import { AdminTemoignageListComponent } from "../../admin_components/admin-temoignage-list/admin-temoignage-list.component";
import { AdminDialogComponent } from "../../admin_components/admin-dialog/admin-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminUserListComponent,
    AdminSessionListComponent,
    AdminSeanceListComponent,
    AdminFormationListComponent,
    AdminContenuListComponent,
    AdminTemoignageListComponent,
    AdminDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ComponentsModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
  ],
})
export class AdminModule {}
