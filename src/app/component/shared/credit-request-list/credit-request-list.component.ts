import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {TableModule} from "primeng/table";
import {StatusComponent} from "../status/status.component";
import {MenuModule} from "primeng/menu";
import {MenuItem} from "primeng/api";
import {DotsMenuComponent} from "../dots-menu/dots-menu.component";
import {CreditRequest, listHeaders} from "../../../service/mappers/credit-retail-mapper";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {firstValueFrom} from "rxjs";
import {CreditRequestDetailActiveItem} from "../credit-request-detail/credit-request-detail.component";
import {Router} from "@angular/router";

export enum CreditRequestListComponentEventType {
  CANCEL, ADD_DOCUMENTS, VIEW_DETAILS
}

export interface CreditRequestListComponentEvent {
  type: CreditRequestListComponentEventType,
  item: CreditRequest
}

@Component({
  selector: 'app-credit-request-list',
  standalone: true,
  imports: [
    TableModule,
    StatusComponent,
    MenuModule,
    DotsMenuComponent,
    BadgeModule,
    ProgressSpinnerModule,
    TranslateModule,
  ],
  templateUrl: './credit-request-list.component.html',
  styleUrl: './credit-request-list.component.scss'
})
export class CreditRequestListComponent {

  @Output() onEventSend = new EventEmitter<CreditRequestListComponentEvent>();
  headers = listHeaders
  creditRequests = input.required<CreditRequest[]>()
  itemSelected = signal<any>(null)

  menuItems: MenuItem[] = []

  constructor(private router: Router, translateService: TranslateService) {
    this.getDynamicTableLabels(translateService).then()
  }

  selectItem(ref?: any) {
    this.itemSelected.set(ref)
  }

  sendEvent(type: CreditRequestListComponentEventType) {
    this.onEventSend.emit({ type, item: this.itemSelected() })
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
        command: () => this.sendEvent(CreditRequestListComponentEventType.VIEW_DETAILS)
      },
      {
        label: data[1],
        icon : 'pi pi-upload',
        command: () => this.sendEvent(CreditRequestListComponentEventType.ADD_DOCUMENTS)
      },
      {
        separator: true
      },
      {
        label: data[2],
        icon : 'pi pi-times-circle',
        command: () => {
          this.sendEvent(CreditRequestListComponentEventType.CANCEL)
        }
      }
    ]
  }

}
