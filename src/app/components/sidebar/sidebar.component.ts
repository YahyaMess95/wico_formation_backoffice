import { Component, OnInit } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const Admin_ROUTES: RouteInfo[] = [
  {
    path: "/admin/admin_dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
  },

  {
    path: "/admin/user-list",
    title: "Users List",
    icon: "people",
    class: "",
  },
  {
    path: "/admin/session-list",
    title: "Session List",
    icon: " add_to_queue ",
    class: "",
  },
  {
    path: "/admin/seance-list",
    title: "Seance List",
    icon: "cast_for_education",
    class: "",
  },
  {
    path: "/admin/formation-list",
    title: "Formation List",
    icon: "card_membership",
    class: "",
  },
  {
    path: "/admin/temoignage-list",
    title: "Temoignage List",
    icon: "switch_account",
    class: "",
  },
  // {
  //   path: "/admin/contenu-list",
  //   title: "Contenu List",
  //   icon: "source",
  //   class: "",
  // },
  // {
  //   path: "/admin/seance-list",
  //   title: "Seance List",
  //   icon: "content_paste",
  //   class: "",
  // },
  // {
  //   path: "/admin/typography",
  //   title: "Typography",
  //   icon: "library_books",
  //   class: "",
  // },
  // { path: "/admin/icons", title: "Icons", icon: "bubble_chart", class: "" },
  // { path: "/admin/maps", title: "Maps", icon: "location_on", class: "" },
  {
    path: "/admin/notifications",
    title: "Notifications",
    icon: "notifications",
    class: "",
  },
];
export const User_ROUTES: RouteInfo[] = [
  {
    path: "/client/user_dashboard",
    title: "Dashboard",
    icon: "dashboard",
    class: "",
  },
  {
    path: "/client/profile",
    title: "Profile",
    icon: "person",
    class: "",
  },
  {
    path: "/client/Training-list",
    title: "Training",
    icon: "content_paste",
    class: "",
  },
  // {
  //   path: "/client/typography",
  //   title: "Typography",
  //   icon: "library_books",
  //   class: "",
  // },
  // { path: "/client/icons", title: "Icons", icon: "bubble_chart", class: "" },
  // { path: "/client/maps", title: "Maps", icon: "location_on", class: "" },
  {
    path: "/client/notifications",
    title: "Notifications",
    icon: "notifications",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = Admin_ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
