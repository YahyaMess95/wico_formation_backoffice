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
    path: "/admin/profile",
    title: "Profile",
    icon: "person",
    class: "",
  },
  {
    path: "/admin/user-list",
    title: "Users List",
    icon: "content_paste",
    class: "",
  },
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