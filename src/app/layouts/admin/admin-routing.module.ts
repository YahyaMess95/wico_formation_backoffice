import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "app/admin_components/admin-dashboard/admin-dashboard.component";
import { AdminUserListComponent } from "app/admin_components/admin-user-list/admin-user-list.component";
import { IconsComponent } from "app/icons/icons.component";
import { MapsComponent } from "app/maps/maps.component";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { TypographyComponent } from "app/typography/typography.component";
import { UpgradeComponent } from "app/upgrade/upgrade.component";
import { UserProfileComponent } from "app/user-profile/user-profile.component";

const routes: Routes = [
  { path: "", redirectTo: "admin_dashboard" },
  { path: "admin_dashboard", component: AdminDashboardComponent },
  { path: "profile", component: UserProfileComponent },
  { path: "user-list", component: AdminUserListComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
