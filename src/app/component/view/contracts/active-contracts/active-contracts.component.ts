import {Component} from '@angular/core';
import {ActiveContractsTableComponent} from "../active-contracts-table/active-contracts-table.component";
import {TranslateModule} from "@ngx-translate/core";
import {ViewRequestsComponent} from "../../../shared/view-requests/view-requests.component";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-active-contracts',
  standalone: true,
  imports: [
    ActiveContractsTableComponent,
    TranslateModule,
    ViewRequestsComponent,
    CardModule
  ],
  templateUrl: './active-contracts.component.html',
  styleUrl: './active-contracts.component.scss'
})
export class ActiveContractsComponent {


}
