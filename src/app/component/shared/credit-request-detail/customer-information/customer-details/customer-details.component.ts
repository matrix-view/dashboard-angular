import {Component, input} from '@angular/core';
import {LabelValueComponent} from "../../../label-value/label-value.component";
import {CompanyComponent} from "./company/company.component";
import {PrivatePersonComponent} from "./private-person/private-person.component";
import {
  buildCreditRequestCustomerInformationTranslationConfig,
  CustomerType
} from "../../../../../service/mappers/credit-retail-mapper";
import {ContactDataComponent} from "./contact-data/contact-data.component";
import {Customer} from "../../../../../domain/customer/model/customer";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [
    LabelValueComponent,
    CompanyComponent,
    PrivatePersonComponent,
    ContactDataComponent,
    TranslateModule
  ],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {

  customer = input.required<Customer>()

  translateObject: any = {}

  constructor(translateService: TranslateService) {
    buildCreditRequestCustomerInformationTranslationConfig(translateService).then(translateObject => this.translateObject = translateObject)
  }

  get customerType() {
    return this.customer().legalEntity?.enumId
  }

  get customerTypeTitle() {
    if (!this.translateObject) return ""
    if (this.verifyCustomerType(CustomerType.PRIVATE_PERSON)) {
      return this.translateObject['PAGES.CREDIT_REQUEST_DETAIL.QUOTE_INFORMATION.CUSTOMER_TYPE.PRIVATE_PERSON']
    } else if(this.verifyCustomerType(CustomerType.COMPANY)) {
      return this.translateObject['PAGES.CREDIT_REQUEST_DETAIL.QUOTE_INFORMATION.CUSTOMER_TYPE.COMPANY']
    } else {
      return ' - '
    }
  }

  verifyCustomerType(customerTypes: string[]) {
    return this.customerType && customerTypes.includes(this.customerType)
  }

  protected readonly CustomerType = CustomerType;
}
