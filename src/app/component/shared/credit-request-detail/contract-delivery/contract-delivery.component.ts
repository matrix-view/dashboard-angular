import {Component, input} from '@angular/core';
import {CreditRequestState} from "../../../../store/credit-retail/credit-retail-state";
import {TabViewModule} from "primeng/tabview";
import {ButtonModule} from "primeng/button";
import {DeliveryInformationComponent} from "./delivery-information/delivery-information.component";
import {ContractDocumentsComponent} from "./contract-documents/contract-documents.component";
import {CreditRequestDetailActiveSubItem} from "../credit-request-detail.component";

@Component({
  selector: 'app-contract-delivery',
  standalone: true,
  imports: [
    TabViewModule,
    ButtonModule,
    DeliveryInformationComponent,
    ContractDocumentsComponent
  ],
  templateUrl: './contract-delivery.component.html',
  styleUrl: './contract-delivery.component.scss'
})
export class ContractDeliveryComponent {

  creditRequest = input.required<CreditRequestState>()

  activeSubItem = input<CreditRequestDetailActiveSubItem>(CreditRequestDetailActiveSubItem.PENDING_CONTRACT_STIPULATION)

}
