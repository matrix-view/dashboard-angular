import {Component, EventEmitter, inject, input, Output, signal, ViewChild} from '@angular/core';
import {MenuItem, SharedModule, SortEvent} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {DropdownModule} from "primeng/dropdown";
import {StatusComponent} from "../status/status.component";
import {ProgressBarModule} from "primeng/progressbar";
import {Export} from "../../../domain/export";
import {NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {LabelValueComponent} from "../label-value/label-value.component";
import {DividerModule} from "primeng/divider";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {getUserInitials} from "../../functions";
import {AvatarModule} from "primeng/avatar";
import {DocumentsUploadedComponent} from "../documents-uploaded/documents-uploaded.component";
import {
  dynamicTableRowNumbersDefault,
  excelColumns,
  verifyCreditApplicationIsAllowedToCancel
} from "../../../service/mappers/credit-retail-mapper";
import {DotsMenuComponent} from "../dots-menu/dots-menu.component";
import {Router} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CreditRequestDetailActiveItem} from "../credit-request-detail/credit-request-detail.component";
import {firstValueFrom} from "rxjs";
import {ConfirmationModalComponent} from "../modal/confirmation-modal/confirmation-modal.component";
import {CreditRetailStore} from "../../../store/credit-retail/credit-retail-state";
import {CreditRequestService} from "../../../service/credit-request.service";

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    StatusComponent,
    ProgressBarModule,
    NgIf,
    ButtonModule,
    RippleModule,
    LabelValueComponent,
    DividerModule,
    ProgressSpinnerModule,
    AvatarModule,
    DocumentsUploadedComponent,
    DotsMenuComponent,
    TranslateModule,
    ConfirmationModalComponent
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrl: './dynamic-table.component.scss',
})
export class DynamicTableComponent {
  @ViewChild('dt') dt?: Table;
  tableData = input<DynamicTable>({
    headers: [],
    values: []
  })
  withPagination = input(false)
  withSort = input(false)
  withRowExpansion = input(false)
  rowNumbers = input(dynamicTableRowNumbersDefault)
  expansionRowId = input<string>('')
  searchFilters = input<string[]>([])
  exportFilename = input<string>('')
  allowCancel = input<boolean>(false)
  itemSelected = signal<any>(null)
  @Output() onPageChange = new EventEmitter<DynamicTablePaginationEvent>();
  creditRetailStore = inject(CreditRetailStore)

  menuItems: MenuItem[] = []

  initialValue = [] as any[];
  isSorted?: boolean | null = undefined;
  searchValue = '';
  selectedExportType: any
  count = 0

  showConfirmationModal = false
  creditApplicationRequestIdToCancel = ``

  protected readonly Export = Export;
  protected readonly getUserInitials = getUserInitials;

  constructor(private router: Router,
              private creditRequestService: CreditRequestService,
              translate: TranslateService) {
    this.getDynamicTableLabels(translate).then()
  }

  async getDynamicTableLabels(translate: TranslateService) {
    const data = await Promise.all([
      firstValueFrom(translate.get('PAGES.COMPONENTS.DOTS_MENU.VIEW_DETAILS')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.DOTS_MENU.ADD_DOCUMENTS')),
      firstValueFrom(translate.get('PAGES.COMPONENTS.DOTS_MENU.CANCEL_REQUEST')),
    ])

    this.menuItems = [
      {
        label: data[0],
        icon : 'pi pi-eye',
        command: () => this.router.navigate(['protected/pending-requests/detail/', this.itemSelected().creditApplication.creditApplicationId]).then()
      },
      {
        label: data[1],
        icon : 'pi pi-upload',
        command: () => {
          this.router.navigate([
            'protected/pending-requests/detail/',
            this.itemSelected().creditApplication.creditApplicationId,
            CreditRequestDetailActiveItem.DOCUMENTS_UPLOAD_CREDIT_REQUEST
          ]).then()
        }
      }
    ]

    if (this.allowCancel()) {
      this.menuItems.push({
        separator: true
      })
      this.menuItems.push({
        label: data[2],
        icon : 'pi pi-times-circle',
        command: () => {
          this.creditApplicationRequestIdToCancel = this.itemSelected().creditApplication.creditApplicationId
          this.showConfirmationModal = true
        }
      })
    }
  }

  pageChange(event: any) {
    this.onPageChange.emit(event)
  }

  selectItem(ref?: any) {
    this.itemSelected.set(ref)
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (!this.isSorted) {
      this.isSorted = null;
      this.tableData().values = [...this.initialValue];
      this.dt?.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: { [x: string]: any; }, data2: { [x: string]: any; }) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result: number;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  shouldPresentStatusField(field: string) {
    return (field === 'status')
  }

  shouldPresentDocuments(field: string) {
    return (field === 'documents')
  }

  onExport(event: any) {
    const selectedObject = event.value
    if (selectedObject && selectedObject.action) {
      const arr: any[] = []
      this.tableData().values.map((v: any) => {
        let obj = {} as any
        excelColumns.map(exc => {
          if (exc.func) {
            obj[exc.column] = exc.func(this.getNestedValue(v, exc.field))
          }
          else {
            obj[exc.column] = this.getNestedValue(v, exc.field)
          }
        })
        arr.push(obj)
      })
      selectedObject.action(arr, this.exportFilename())
    }
  }

  getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  onConfirmationModalEvent(event: any) {
    this.showConfirmationModal = event.show
    if (event.confirmation) {
      this.creditRetailStore.cancelCreditApplication(this.creditRequestService, this.creditApplicationRequestIdToCancel)
    }
  }

}

interface DynamicHeader {
  header: string,
  alias?: string,
  field: string,
  avatar?: boolean
}

interface Line {
  items: Item[]
}

interface Item {
  label: string,
  value: string
}

interface ExpansionRow {
  lines: Line[]
}

export interface StipulationDocument {
  uploaded: number
  total: number
}

export interface ExcelColumn {
  column: string,
  field: string,
  func: (v: string) => string
}

export class DynamicTable {
  headers: DynamicHeader[]
  expansionRow?: ExpansionRow
  values: any[]

  constructor(headers: DynamicHeader[], values: any[], expansionRow?: ExpansionRow) {
    this.headers = headers
    this.values = values
    this.expansionRow = expansionRow
  }
}

export interface DynamicTablePaginationEvent {
  first: number,
  rows: number,
}

