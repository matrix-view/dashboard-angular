import {Component, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {ViewRequestsComponent} from "../../../shared/view-requests/view-requests.component";
import {CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {
  getListPage,
  mapCreditRequestResponseToCreditRequest,
  setDynamicTable
} from "../../../../service/mappers/credit-retail-mapper";
import {
  DynamicTable,
  DynamicTableComponent,
  DynamicTablePaginationEvent
} from "../../../shared/dynamic-table/dynamic-table.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {firstValueFrom} from "rxjs";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-approved',
  standalone: true,
  imports: [
    CardModule,
    ViewRequestsComponent,
    DynamicTableComponent,
    TranslateModule,
    ProgressSpinnerModule
  ],
  templateUrl: './approved.component.html',
  styleUrl: './approved.component.scss'
})
export class ApprovedComponent {

  creditRetailStore = inject(CreditRetailStore)
  loaded = false

  tableConfig = {
    data: new DynamicTable([], [])
  }

  constructor(private service: CreditRequestService,
              private translate: TranslateService) {
    this.loadList()
  }

  loadList() {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.awaitingDelivery(), undefined))
    toObservable(this.creditRetailStore.awaitingDelivery).subscribe(async value => {
      this.tableConfig.data = await firstValueFrom(setDynamicTable(mapCreditRequestResponseToCreditRequest(value), this.translate))
    })
    this.loaded = true
  }

  onPageChange(event: DynamicTablePaginationEvent) {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.awaitingDelivery(), event))
  }

}
