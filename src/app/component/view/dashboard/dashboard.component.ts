import {Component, computed, inject} from '@angular/core';
import {
  CreditRequestListComponent,
  CreditRequestListComponentEvent,
  CreditRequestListComponentEventType
} from "../../shared/credit-request-list/credit-request-list.component";
import {CardModule} from "primeng/card";
import {WelcomeBannerComponent} from "../../shared/welcome-banner/welcome-banner.component";
import {RecentlyPreApprovedComponent} from "../recently-pre-approved/recently-pre-approved.component";
import {ViewRequestsComponent} from "../../shared/view-requests/view-requests.component";
import {StatusOverviewComponent} from "../../shared/status-overview/status-overview.component";
import {Delivery, ReadyForDeliveryComponent} from "../../shared/ready-for-delivery/ready-for-delivery.component";
import {CreditRetailStore} from "../../../store/credit-retail/credit-retail-state";
import {
  CreditRequest, CreditRequestStatus,
  mapCreditRequestResponseToCreditRequest, mapCreditRequestStateToDelivery,
  mapCreditRetailResponseToStatusOverviewContracts,
  mapCreditRetailResponseToStatusOverviewRequests,
} from "../../../service/mappers/credit-retail-mapper";
import {Router} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {CreditRequestDetailActiveItem} from "../../shared/credit-request-detail/credit-request-detail.component";
import {firstValueFrom, map, pipe} from "rxjs";
import {
  ConfirmationModalComponent,
  ConfirmationModalComponentEvent
} from "../../shared/modal/confirmation-modal/confirmation-modal.component";
import {UploadDocumentEventType} from "../../shared/upload-document/upload-document.component";
import {MessageType} from "../../../service/app-message.service";
import {CreditRequestService} from "../../../service/credit-request.service";
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
    CreditRequestListComponent,
    CardModule,
    WelcomeBannerComponent,
    RecentlyPreApprovedComponent,
    ViewRequestsComponent,
    StatusOverviewComponent,
    ReadyForDeliveryComponent,
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

  creditRetailStore = inject(CreditRetailStore)
  creditRequestsState = this.creditRetailStore.creditRequestsBySalesPerson
  creditRequests = computed<CreditRequest[]>(() =>
    mapCreditRequestResponseToCreditRequest(this.creditRequestsState())
      .filter(data => data.creditApplication.status?.enumId !== CreditRequestStatus.CANCELED)
      .slice(0, 8))

  showConfirmationModal = false
  creditApplicationRequestIdToCancel = ``

  statusOverview: any = {
    requests: { title: '', items: [] },
    contracts: { title: '', items: [] }
  }

  deliveries: Delivery[] = []

  constructor(private router: Router,
              private translateService: TranslateService,
              private creditRequestService: CreditRequestService) {
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

  handleCreditRequestListComponentEvents(event: CreditRequestListComponentEvent) {
    switch (event.type) {
      case CreditRequestListComponentEventType.VIEW_DETAILS:
        this.router.navigate(['protected/pending-requests/detail/', event.item.creditApplication.creditApplicationId]).then()
        break
      case CreditRequestListComponentEventType.ADD_DOCUMENTS:
        this.router.navigate([
          'protected/pending-requests/detail/', event.item.creditApplication.creditApplicationId, CreditRequestDetailActiveItem.DOCUMENTS_UPLOAD_CREDIT_REQUEST
        ]).then()
        break
      case CreditRequestListComponentEventType.CANCEL:
        this.showConfirmationModal = true
        this.creditApplicationRequestIdToCancel = event.item.creditApplication.creditApplicationId!
        break
    }
  }


  onConfirmationModalEvent(event: any) {
    this.showConfirmationModal = event.show
    if (event.confirmation) {
      this.creditRetailStore.cancelCreditApplication(this.creditRequestService, this.creditApplicationRequestIdToCancel)
    }
  }

}
