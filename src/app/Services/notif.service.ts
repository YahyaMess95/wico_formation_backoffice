import { Injectable } from "@angular/core";
declare var $: any;

@Injectable({
  providedIn: "root",
})
export class NotifService {
  private containerId = "notification-container"; // Unique ID for the notification container
  private containerSelector = `#${this.containerId}`;

  constructor() {
    // Create the notification container if it doesn't exist
    if ($(this.containerSelector).length === 0) {
      $("body").append(`<div id="${this.containerId}"></div>`);
    }
  }

  private getNotificationOptions(
    from: string,
    align: string,
    error: string,
    type: string,
    icon: string,
    timer: number
  ): any {
    return {
      icon: icon,
      message: error,
      type: type,
      timer: timer, // Remove the timer
      placement: {
        from: from,
        align: align,
      },
      template: this.getNotificationTemplate(icon, type),
      newest_on_top: true, // Display newest notifications on top
    };
  }

  private getNotificationTemplate(icon: string, iconColor: string): string {
    return `
      <div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">
        <button mat-button type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">
          <i class="material-icons">close</i>
        </button>
        <i class="material-icons" style="color: ${iconColor}" data-notify="icon">${icon}</i>
        <span data-notify="title">{1}</span>
        <span data-notify="message">{2}</span>
        <div class="progress" data-notify="progressbar">
          <div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
        </div>
        <a href="{3}" target="{4}" data-notify="url"></a>
      </div>
    `;
  }

  public showNotificationerror(from, align, error, type) {
    const iconMap: { [key: string]: string } = {
      danger: "error",
      success: "done",
    };
    const icon = iconMap[type] || "";
    const iconColor = "white";
    $.notifyClose();
    $.notify(
      {
        icon: icon,
        message: error,
      },
      {
        ...this.getNotificationOptions(from, align, error, type, icon, 500),
        template: this.getNotificationTemplate(icon, iconColor),
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
    const iconColor = "black";
    $.notifyClose();
    return new Promise<boolean>((resolve) => {
      $.notify(
        {
          icon: icon,
          message: error,
        },
        {
          ...this.getNotificationOptions(from, align, error, type, icon, 0),
          onShow: function () {
            $(this).append(`
              <div class="actions">
                <button class="btn btn-success btn-confirm btn-sm mr-2">Confirm</button>
                <button class="btn btn-danger btn-cancel btn-sm">Cancel</button>
              </div>
            `);
            $(this)
              .find(".btn-confirm")
              .click(function () {
                $.notifyClose();
                resolve(true);
              });

            $(this)
              .find(".btn-cancel")
              .click(function () {
                $.notifyClose();
              });
          },
          onClose: function () {
            resolve(false);
          },
          template: this.getNotificationTemplate(icon, iconColor), // Update template with icon color
        }
      );
    });
  }
}
