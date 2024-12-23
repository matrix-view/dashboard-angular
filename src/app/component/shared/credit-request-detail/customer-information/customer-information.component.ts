import {Component, input} from '@angular/core';
import {CreditRequestState} from "../../../../store/credit-retail/credit-retail-state";
import {LabelValueComponent} from "../../label-value/label-value.component";
import {QuoteInformationComponent} from "./quote-information/quote-information.component";

import {CustomerDetailsComponent} from "./customer-details/customer-details.component";

@Component({
  selector: 'app-customer-information',
  standalone: true,
  imports: [
    LabelValueComponent,
    QuoteInformationComponent,
    CustomerDetailsComponent
  ],
  templateUrl: './customer-information.component.html',
  styleUrl: './customer-information.component.scss'
})
export class CustomerInformationComponent {

  creditRequest = input.required<CreditRequestState>()

  get salesQuote() {
    return this.creditRequest().salesQuote?.salesQuote
  }

  get customer() {
    return this.creditRequest().customer
  }

}
