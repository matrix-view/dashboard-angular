import {ChangeDetectorRef, Component, inject, PLATFORM_ID} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {isPlatformBrowser} from "@angular/common";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-doughnut-chart-example',
  standalone: true,
  imports: [
    ChartModule,
    CardModule
  ],
  templateUrl: './doughnut-chart-example.component.html',
  styleUrl: './doughnut-chart-example.component.scss'
})
export class DoughnutChartExampleComponent {

  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);


  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      this.data = {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [documentStyle.getPropertyValue('--p-cyan-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
          }
        ]
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };
      this.cd.markForCheck()
    }
  }
}
