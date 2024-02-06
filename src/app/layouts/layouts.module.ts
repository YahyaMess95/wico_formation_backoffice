import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserModule } from "./user/user.module";
import { AdminModule } from "./admin/admin.module";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { UserComponent } from "./user/user.component";
import { IconsComponent } from "app/icons/icons.component";
import { MapsComponent } from "app/maps/maps.component";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { TypographyComponent } from "app/typography/typography.component";
import { UpgradeComponent } from "app/upgrade/upgrade.component";
import { UserProfileComponent } from "app/user-profile/user-profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TableListComponent } from "app/table-list/table-list.component";
import { ComponentsModule } from "app/components/components.module";

@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TableListComponent,
    UserProfileComponent,
  ],
  exports: [
    AdminComponent,
    UserComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    TableListComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    UserModule,
    AdminModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
})
export class LayoutsModule {}
