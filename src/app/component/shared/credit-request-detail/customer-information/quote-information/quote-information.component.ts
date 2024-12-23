import {Component, computed, input} from '@angular/core';
import {LabelValueComponent} from "../../../label-value/label-value.component";
import {SalesQuote} from "../../../../../domain/quotation";
import {FormsModule} from "@angular/forms";
import {
  mapCreditRequestStateToLicensePlate,
  mapSalesQuoteToQuoteInformationComponentModel
} from "../../../../../service/mappers/credit-retail-mapper";
import {TranslateModule} from "@ngx-translate/core";
import {CreditRequestState} from "../../../../../store/credit-retail/objects";


export interface QuoteInformationComponentModel {
  reference: string
  creationDate: string
  vehicleDescription: string
  licensePlate: string
  duration: string
  distance: string
  product: string
  leasePrice: string
}

@Component({
  selector: 'app-quote-information',
  standalone: true,
  imports: [
    LabelValueComponent,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './quote-information.component.html',
  styleUrl: './quote-information.component.scss'
})
export class QuoteInformationComponent {

  salesQuote = input.required<SalesQuote>()

  model = computed<QuoteInformationComponentModel>(() => mapSalesQuoteToQuoteInformationComponentModel(this.salesQuote()))

  creditRequest = input.required<CreditRequestState>()

  get licensePlate() {
    return mapCreditRequestStateToLicensePlate(this.creditRequest())?? "-"
  }


}
