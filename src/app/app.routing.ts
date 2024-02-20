import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./layouts/admin/admin.component";
import { UserComponent } from "./layouts/user/user.component";
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { AuthGuardService } from "./Services/auth-guard.service";
const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginpageComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./layouts/layouts.module").then((m) => m.LayoutsModule),
      },
    ],
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuardService],
        loadChildren: () =>
          import("./layouts/layouts.module").then((m) => m.LayoutsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
