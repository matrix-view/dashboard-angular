import {Component, computed, input} from '@angular/core';
import {LabelValueComponent} from "../../../../label-value/label-value.component";
import {mapCustomerToCompanyModel} from "../../../../../../service/mappers/credit-retail-mapper";
import {Customer} from "../../../../../../domain/customer/model/customer";
import {TranslateModule} from "@ngx-translate/core";

export interface CompanyModel {
  legalEntity: string
  companyName: string
  vatNumber: string
  vatLiability: string
}


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [
    LabelValueComponent,
    TranslateModule
  ],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  customer = input.required<Customer>()
  companyModel = computed<CompanyModel>(() => mapCustomerToCompanyModel(this.customer()))

}
