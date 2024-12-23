import {Component, computed, inject} from '@angular/core';
import {CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {
  getListPage,
  mapArchivedCreditRetailResponseToCreditRequest
} from "../../../../service/mappers/credit-retail-mapper";
import {CardModule} from "primeng/card";
import {PendingRequestsListComponent} from "../../../shared/pending-requests-list/pending-requests-list.component";
import {ViewRequestsComponent} from "../../../shared/view-requests/view-requests.component";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {
  DynamicTable,
  DynamicTableComponent,
  DynamicTablePaginationEvent
} from "../../../shared/dynamic-table/dynamic-table.component";
import {firstValueFrom, Observable} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-archived',
  standalone: true,
    imports: [
        CardModule,
        PendingRequestsListComponent,
        ViewRequestsComponent,
        FormsModule,
        TableModule,
        DynamicTableComponent,
        TranslateModule
    ],
  templateUrl: './archived.component.html',
  styleUrl: './archived.component.scss'
})
export class ArchivedComponent {

  creditRetailStore = inject(CreditRetailStore)

  setDynamicTable(arr: any[]) {
    return new Observable<DynamicTable>(subscriber => {
      Promise.all([
        firstValueFrom(this.translate.get('PAGES.COMPONENTS.LIST.SHARED.REFERENCE')),
        firstValueFrom(this.translate.get('PAGES.COMPONENTS.LIST.SHARED.CUSTOMER_NAME')),
        firstValueFrom(this.translate.get('PAGES.COMPONENTS.LIST.SHARED.PRODUCT')),
        firstValueFrom(this.translate.get('PAGES.COMPONENTS.LIST.SHARED.STATUS')),
      ]).then((data) => {
        subscriber.next(new DynamicTable(
          [
            { header: data[0], field: 'reference' },
            { header: data[1], field: 'customer' },
            { header: data[2], field: 'product' },
            { header: data[3], field: 'status' },
          ], arr
        ))
      })
    })
  }

  tableConfig: any = {
    data: [],
    count: 100,
    offset: 0
  }


  constructor(private service: CreditRequestService, private translate: TranslateService) {
    this.refresh().then()
  }

  async refresh() {
    const result = await this.creditRetailStore.getCreditApplicationsArchived(this.service, this.tableConfig.count, this.tableConfig.offset)
    console.log("archived", result)
    this.setDynamicTable(mapArchivedCreditRetailResponseToCreditRequest(result)).subscribe(data => this.tableConfig.data = data)
  }

  onPageChange(event: DynamicTablePaginationEvent) {
    // TODO finish
    this.creditRetailStore.getCreditRequestsPending(this.service, getListPage(this.creditRetailStore.awaitingDelivery(), event))
  }

}
