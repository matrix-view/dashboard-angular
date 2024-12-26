import {Component} from '@angular/core';
import {CardModule} from "primeng/card";
import {Delivery} from "../../shared/ready-for-delivery/ready-for-delivery.component";
import {Router} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ConfirmationModalComponent} from "../../shared/modal/confirmation-modal/confirmation-modal.component";

import {
  BasicChartExampleComponent
} from "../../shared/dashboard/charts/basic-chart-example/basic-chart-example.component";
import {
  DoughnutChartExampleComponent
} from "../../shared/dashboard/charts/doughnut-chart-example/doughnut-chart-example.component";
import {LineChartExampleComponent} from "../../shared/dashboard/charts/line-chart-example/line-chart-example.component";
import {PieChartExampleComponent} from "../../shared/dashboard/charts/pie-chart-example/pie-chart-example.component";
import {
  PolarAreaChartExampleComponent
} from "../../shared/dashboard/charts/polar-area-chart-example/polar-area-chart-example.component";
import {
  VerticalBarChartExampleComponent
} from "../../shared/dashboard/charts/vertical-bar-chart-example/vertical-bar-chart-example.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    ConfirmationModalComponent,
    BasicChartExampleComponent,
    DoughnutChartExampleComponent,
    LineChartExampleComponent,
    PieChartExampleComponent,
    PolarAreaChartExampleComponent,
    VerticalBarChartExampleComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  showConfirmationModal = false
  creditApplicationRequestIdToCancel = ``

  statusOverview: any = {
    requests: { title: '', items: [] },
    contracts: { title: '', items: [] }
  }

  deliveries: Delivery[] = []

  constructor(private router: Router,
              private translateService: TranslateService) {
    // setTimeout(() => {
    //   const isInitialized = this.creditRequests().length > 0
    //   if (!isInitialized) {
    //     this.creditRetailStore.getCreditApplications(this.creditRequestService)
    //   }
    // }, 1000)
    // toObservable(this.creditRequestsState).subscribe(next => {
    //   this.deliveries = mapCreditRequestStateToDelivery(this.creditRetailStore.findPendingContracts(), next)
    //   mapCreditRetailResponseToStatusOverviewRequests(next, this.translateService).then(res => this.statusOverview.requests = res)
    // })
    //
    // toObservable(this.creditRetailStore.findPendingContracts).subscribe(next => {
    //   if (next) {
    //     this.deliveries = mapCreditRequestStateToDelivery(next, this.creditRequestsState())
    //     mapCreditRetailResponseToStatusOverviewContracts(next, this.translateService).then(
    //       res => this.statusOverview.contracts = res
    //     )
    //   }
    // })
  }

  onConfirmationModalEvent(event: any) {
    this.showConfirmationModal = event.show
  }

}
