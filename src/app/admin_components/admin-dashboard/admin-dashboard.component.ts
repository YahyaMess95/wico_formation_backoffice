import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import * as Chartist from "chartist";
import { AnalyseService } from "app/Services/analyse.service";
import { finalize } from "rxjs";
import { MatSelect } from "@angular/material/select";

@Component({
  selector: "admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild(MatSelect) select: MatSelect;
  isLoading: boolean = true;
  Countforamtion;
  Countseance;
  Countsession;
  Counttemoignage;
  Countuser;
  formationsByDay;
  // currentYear = new Date().getFullYear();
  currentYear = 2026;
  startYear = 2024;
  yearsList: number[] = [];
  selectedYear: number;

  populateYearsList(startYear: number, endYear: number): void {
    this.yearsList = [];
    for (let year = startYear; year <= endYear; year++) {
      this.yearsList.push(year);
    }
  }

  constructor(private analyseService: AnalyseService) {}

  //  get count depend year
  getCount(year: number) {
    this.formationsByDay = [0, 0, 0, 0, 0, 0, 0];
    this.isLoading = true;
    this.analyseService
      .getCount(year)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (response) => {
          if (response && response.result) {
            response.result.formationsByDay.forEach((obj) => {
              const date = new Date(obj.date);
              const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
              this.formationsByDay[dayOfWeek] = obj.count;
            });

            this.Countuser = response.result.Countuser || 0;
            this.Countsession = response.result.Countsession || 0;
            this.Countseance = response.result.Countseance || 0;
            this.Countforamtion = response.result.Countforamtion || 0;
            this.Counttemoignage = response.result.Counttemoignage || 0;

            /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
            var highValue = this.Countforamtion + 1.5;

            var datawebsiteViewsChart = {
              labels: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
              series: [this.formationsByDay],
            };
            var optionswebsiteViewsChart = {
              axisX: {
                showGrid: false,
              },
              low: 0,
              high: highValue != 1.5 ? highValue : 4,
              chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
            };
            var responsiveOptions: any[] = [
              [
                "screen and (max-width: 640px)",
                {
                  seriesBarDistance: 5,
                  axisX: {
                    labelInterpolationFnc: function (value) {
                      return value[0];
                    },
                  },
                },
              ],
            ];
            var websiteViewsChart = new Chartist.Bar(
              "#websiteViewsChart",
              datawebsiteViewsChart,
              optionswebsiteViewsChart,
              responsiveOptions
            );

            //start animation for the Emails Subscription Chart
            this.startAnimationForBarChart(websiteViewsChart);
          } else {
            console.error("Invalid response format:", response);
          }
        },
        (error) => {
          console.error("Error fetching count:", error);
        }
      );
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on("draw", function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    });
    seq2 = 0;
  }
  ngOnInit() {
    this.populateYearsList(this.startYear, this.currentYear);
    this.getCount(this.startYear);

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ["M", "T", "W", "T", "F", "S", "S"],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 40, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var dailySalesChart = new Chartist.Line(
      "#dailySalesChart",
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);
  }
}
