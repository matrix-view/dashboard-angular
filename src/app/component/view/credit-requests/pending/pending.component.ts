import {Component, computed, inject} from '@angular/core';
import {
  PendingRequestsListComponent,
  TableConfig
} from "../../../shared/pending-requests-list/pending-requests-list.component";
import {CreditRequestState, CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {CardModule} from "primeng/card";
import {ViewRequestsComponent} from "../../../shared/view-requests/view-requests.component";
import {
  dynamicTableRowNumbersDefault, getListPage,
  mapCreditRequestResponseToCreditRequest,
  setDynamicTable
} from "../../../../service/mappers/credit-retail-mapper";
import {
  DynamicTable,
  DynamicTableComponent,
  DynamicTablePaginationEvent
} from "../../../shared/dynamic-table/dynamic-table.component";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {firstValueFrom, Observable} from "rxjs";
import {deepClone} from "../../../../utils/common";

@Component({
  selector: 'app-pending',
  standalone: true,
    imports: [
        PendingRequestsListComponent,
        CardModule,
        ViewRequestsComponent,
        DynamicTableComponent,
        ProgressSpinnerModule,
        TranslateModule
    ],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {

  creditRetailStore = inject(CreditRetailStore)
  loaded = false

  tableConfig: TableConfig = {
    data: new DynamicTable([], [])
  }

  constructor(private service: CreditRequestService,
              private translate: TranslateService) {
    this.loadList()
  }

  loadList() {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.pending(), undefined))
    toObservable(this.creditRetailStore.pending).subscribe(async value => {
        this.tableConfig.data = await firstValueFrom(setDynamicTable(mapCreditRequestResponseToCreditRequest(value), this.translate))
      })
    this.loaded = true
  }

  onPageChange(event: DynamicTablePaginationEvent) {
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.pending(), event))
  }

}
