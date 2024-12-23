import {Component, input} from '@angular/core';
import {CreditRequestState} from "../../../../store/credit-retail/objects";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment-plan',
  standalone: true,
    imports: [
        TranslateModule
    ],
  templateUrl: './payment-plan.component.html',
  styleUrl: './payment-plan.component.scss'
})
export class PaymentPlanComponent {
  creditRequest = input.required<CreditRequestState>()
}
