import {ChangeDetectorRef, Component, inject, PLATFORM_ID} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {isPlatformBrowser} from "@angular/common";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-vertical-bar-chart-example',
  standalone: true,
  imports: [
    ChartModule,
    CardModule
  ],
  templateUrl: './vertical-bar-chart-example.component.html',
  styleUrl: './vertical-bar-chart-example.component.scss'
})
export class VerticalBarChartExampleComponent {

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
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.data = {
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-pink-500'),
              documentStyle.getPropertyValue('--p-gray-500'),
              documentStyle.getPropertyValue('--p-orange-500'),
              documentStyle.getPropertyValue('--p-purple-500'),
              documentStyle.getPropertyValue('--p-cyan-500')
            ],
            label: 'My dataset'
          }
        ],
        labels: ['Pink', 'Gray', 'Orange', 'Purple', 'Cyan']
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
      this.cd.markForCheck()
    }
  }

}
