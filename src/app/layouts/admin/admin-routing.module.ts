import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminContenuListComponent } from "app/admin_components/admin-contenu-list/admin-contenu-list.component";
import { AdminDashboardComponent } from "app/admin_components/admin-dashboard/admin-dashboard.component";
import { AdminFormationListComponent } from "app/admin_components/admin-formation-list/admin-formation-list.component";
import { AdminSeanceListComponent } from "app/admin_components/admin-seance-list/admin-seance-list.component";
import { AdminSessionListComponent } from "app/admin_components/admin-session-list/admin-session-list.component";
import { AdminTemoignageListComponent } from "app/admin_components/admin-temoignage-list/admin-temoignage-list.component";
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
  { path: "session-list", component: AdminSessionListComponent },
  { path: "seance-list", component: AdminSeanceListComponent },
  { path: "formation-list", component: AdminFormationListComponent },
  { path: "contenu-list", component: AdminContenuListComponent },
  { path: "temoignage-list", component: AdminTemoignageListComponent },
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
