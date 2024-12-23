import {Component, computed, input} from '@angular/core';
import {LabelValueComponent} from "../../../../label-value/label-value.component";
import {mapCustomerToContactDataModel} from "../../../../../../service/mappers/credit-retail-mapper";
import {Customer} from "../../../../../../domain/customer/model/customer";
import {TranslateModule} from "@ngx-translate/core";

export interface ContactDataModel {
  addressLine1: string
  addressLine1Nr: string
  postalCode: string
  city: string
  country: string
  email: string
  phoneNumber1: string
  phoneNumber2: string
}

@Component({
  selector: 'app-contact-data',
  standalone: true,
  imports: [
    LabelValueComponent,
    TranslateModule
  ],
  templateUrl: './contact-data.component.html',
  styleUrl: './contact-data.component.scss'
})
export class ContactDataComponent {

  customer = input.required<Customer>()
  contactDataModel = computed<ContactDataModel>(() => mapCustomerToContactDataModel(this.customer()))

}
