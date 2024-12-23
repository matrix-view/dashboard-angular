import {Component, signal, ViewChild} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {DotsMenuComponent} from "../../../shared/dots-menu/dots-menu.component";
import {DropdownModule} from "primeng/dropdown";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {LabelValueComponent} from "../../../shared/label-value/label-value.component";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {RippleModule} from "primeng/ripple";
import {MenuItem, SharedModule, SortEvent} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {CreditRequestDetailActiveItem} from "../../../shared/credit-request-detail/credit-request-detail.component";
import {Export} from "../../../../domain/export";
import {dynamicTableRowNumbersDefault, excelColumns} from "../../../../service/mappers/credit-retail-mapper";
import {expectedWarnMonths, mockTableData} from "../../../../service/mappers/contracts-mapper";
import {ExpectedDateComponent} from "../../../shared/expected-date/expected-date.component";

@Component({
  selector: 'app-active-contracts-table',
  standalone: true,
  imports: [
    AvatarModule,
    ButtonModule,
    DividerModule,
    DotsMenuComponent,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    LabelValueComponent,
    NgIf,
    PaginatorModule,
    RippleModule,
    SharedModule,
    TableModule,
    TranslateModule,
    ExpectedDateComponent
  ],
  templateUrl: './active-contracts-table.component.html',
  styleUrl: './active-contracts-table.component.scss'
})
export class ActiveContractsTableComponent {

  @ViewChild('dt') dt?: Table;
  tableData: any = {
    headers: [],
    values: [],
    expansionRow: [],
  }
  initialValue = [] as any[];
  menuItems: MenuItem[] = []
  itemSelected = signal<any>(null)
  isSorted?: boolean | null = undefined;
  exportFilename = 'active-contracts.pdf'
  searchValue = '';
  selectedExportType: any
  count = 0
  searchFilters: string[] = ['reference']

  protected readonly export = Export;
  protected readonly dynamicTableRowNumbersDefault = dynamicTableRowNumbersDefault
  protected readonly expectedWarnMonths = expectedWarnMonths

  constructor(private router: Router, translate: TranslateService) {
    this.getDynamicTableLabels(translate).then()
  }

  async getDynamicTableLabels(translate: TranslateService) {
    this.tableData = await firstValueFrom(mockTableData(translate))
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
      this.tableData.values = [...this.initialValue];
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

  getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
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
      selectedObject.action(arr, this.exportFilename)
    }
  }


}
