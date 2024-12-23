import {Component, input} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {listHeaders} from "../../../service/mappers/credit-retail-mapper";
import {DotsMenuComponent} from "../dots-menu/dots-menu.component";
import {SharedModule} from "primeng/api";
import {StatusComponent} from "../status/status.component";
import {TableModule} from "primeng/table";
import {ViewRequestsComponent} from "../view-requests/view-requests.component";
import {DropdownModule} from "primeng/dropdown";
import {AutoCompleteModule} from "primeng/autocomplete";


export interface TableConfig {
  data: any
}

export interface SearchConfig {
  onInputChange: any
}

export interface ExportConfig {
  onDownloadExcel: any
  onDownloadPdf: any
  onDownloadWord: any
}

@Component({
  selector: 'app-pending-requests-list',
  standalone: true,
  imports: [
    JsonPipe,
    DotsMenuComponent,
    SharedModule,
    StatusComponent,
    TableModule,
    ViewRequestsComponent,
    DropdownModule,
    AutoCompleteModule
  ],
  templateUrl: './pending-requests-list.component.html',
  styleUrl: './pending-requests-list.component.scss'
})
export class PendingRequestsListComponent {

  tableConfig = input.required<TableConfig>()
  searchConfig = input.required<SearchConfig>()
  exportConfig = input.required<ExportConfig>()

  protected readonly headers = listHeaders;

  exportTypes = [
    { name: "EXCEL" },
    { name: "PDF" },
    { name: "WORD" },
  ]
  selectedCity: any;

}
