import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./layouts/admin/admin.component";
import { UserComponent } from "./layouts/user/user.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "admin",
    pathMatch: "full",
  },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {
        path: "",
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
