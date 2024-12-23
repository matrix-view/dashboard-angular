import {Component, computed, inject} from '@angular/core';
import {CardModule} from "primeng/card";
import {PendingRequestsListComponent} from "../../../shared/pending-requests-list/pending-requests-list.component";
import {
  getListPage,
  mapCreditRequestResponseToCreditRequest,
  setDynamicTable
} from "../../../../service/mappers/credit-retail-mapper";
import {CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {ViewRequestsComponent} from "../../../shared/view-requests/view-requests.component";
import {
  DynamicTable,
  DynamicTableComponent,
  DynamicTablePaginationEvent
} from "../../../shared/dynamic-table/dynamic-table.component";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-pre-approved',
  standalone: true,
  imports: [
    CardModule,
    PendingRequestsListComponent,
    ViewRequestsComponent,
    DynamicTableComponent,
    ProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './pre-approved.component.html',
  styleUrl: './pre-approved.component.scss'
})
export class PreApprovedComponent {

  creditRetailStore = inject(CreditRetailStore)

  loaded = false

  tableConfig = {
    data: new DynamicTable([], [])
  }

  constructor(private service: CreditRequestService, private translate: TranslateService) {
    this.loadList()
  }

  loadList() {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.preApproved(), undefined))
    toObservable(this.creditRetailStore.preApproved).subscribe(async value => {
      this.tableConfig.data = await firstValueFrom(setDynamicTable(mapCreditRequestResponseToCreditRequest(value), this.translate))
    })
    this.loaded = true
  }

  onPageChange(event: DynamicTablePaginationEvent) {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.preApproved(), event))
  }

}
