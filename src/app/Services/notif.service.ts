import { Injectable } from "@angular/core";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class NotifService {
  constructor() {}

  public showNotificationerror(from, align, error, type) {
    const iconMap: { [key: string]: string } = {
      danger: "error",
      success: "done",
    };
    const icon = iconMap[type] || "";

    $.notify(
      {
        icon: icon,
        message: error,
      },
      {
        type: type,
        timer: 200,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">' +
          icon +
          "</i> " +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }

  async showNotificationconfirmation(
    from,
    align,
    error,
    type
  ): Promise<boolean> {
    const iconMap: { [key: string]: string } = {
      danger: "error",
      success: "done",
      confirm: "help_outline",
    };
    const icon = iconMap[type] || "";

    return new Promise<boolean>((resolve) => {
      $.notify(
        {
          icon: icon,
          message: error,
        },
        {
          type: type,
          timer: 0,
          placement: {
            from: from,
            align: align,
          },
          template:
            '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons  " style="color: black" data-notify="icon">' +
            icon +
            "</i> " +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            "</div>" +
            '<div class="actions">' +
            '<button class="btn btn-success btn-confirm btn-sm mr-2">Confirm</button>' +
            '<button class="btn btn-danger btn-cancel btn-sm">Cancel</button>' +
            "</div>" +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            "</div>",
          onShow: function () {
            $(".btn-confirm").click(function () {
              $.notifyClose();
              resolve(true);
            });

            $(".btn-cancel").click(function () {
              $.notifyClose();
              resolve(false);
            });
          },
        }
      );
    });
  }
}
