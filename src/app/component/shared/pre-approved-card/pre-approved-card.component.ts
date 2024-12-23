import {Component, input} from '@angular/core';
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {BadgeModule} from "primeng/badge";
import {Buyer} from "../../../domain/buyer";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-pre-approved-card',
  standalone: true,
  imports: [
    CardModule,
    DividerModule,
    BadgeModule,
    ProgressSpinnerModule
  ],
  templateUrl: './pre-approved-card.component.html',
  styleUrl: './pre-approved-card.component.scss'
})
export class PreApprovedCardComponent {

  preApproved = input<Buyer>()

  styles = {
    'badge-circle': {
      'font-family': 'Graphie-Bold, sans serif',
      'background-color': '#FCE5DF',
      color: '#EB5128',
      'font-weight': 800,
      'font-size': '11px'
    }
  }

  get hasQuantity(): boolean {
    return !!this.preApproved()?.document?.quantity
  }

}
