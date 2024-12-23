import {Component, computed, input} from '@angular/core';
import {LabelValueComponent} from "../../../../label-value/label-value.component";
import {mapCustomerToPrivatePersonModel} from "../../../../../../service/mappers/credit-retail-mapper";
import {Customer} from "../../../../../../domain/customer/model/customer";
import {TranslateModule} from "@ngx-translate/core";

export interface PrivatePersonModel {
  firstName: string
  lastName: string
  gender: string
  birthDate: string
}

@Component({
  selector: 'app-private-person',
  standalone: true,
  imports: [
    LabelValueComponent,
    TranslateModule
  ],
  templateUrl: './private-person.component.html',
  styleUrl: './private-person.component.scss'
})
export class PrivatePersonComponent {

  customer = input.required<Customer>()
  privatePersonModel = computed<PrivatePersonModel>(() => mapCustomerToPrivatePersonModel(this.customer()))

}
