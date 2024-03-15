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
import { MatToolbarModule } from "@angular/material/toolbar";
import { TableListComponent } from "app/table-list/table-list.component";
import { ComponentsModule } from "app/components/components.module";
import { MatIconModule } from "@angular/material/icon";
import { LoginpageComponent } from "app/loginpage/loginpage.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NotifService } from "app/Services/notif.service";
import { AdminService } from "app/Services/admin.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "app/Services/auth-interceptor.service";
import { AuthService } from "app/Services/auth.service";
import { PasswordRecoveryComponent } from "app/forgetpassword/password-recovery/password-recovery.component";

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
    LoginpageComponent,
    PasswordRecoveryComponent,
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
    LoginpageComponent,
    PasswordRecoveryComponent,
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
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    NotifService,
    AdminService,
  ],
})
export class LayoutsModule {}
