import {Component, input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {styles} from "../../objects";
import {DividerModule} from "primeng/divider";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-ready-for-delivery',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    RouterLink
  ],
  templateUrl: './ready-for-delivery.component.html',
  styleUrl: './ready-for-delivery.component.scss'
})
export class ReadyForDeliveryComponent {
  protected readonly styles = styles;
  deliveries = input.required<Delivery[]>();

  constructor(private router: Router) {
  }

  navigateToRoute(route: string) {
    this.router.navigate([route]).then()
  }
}

export interface Delivery {
  name: string;
  plate: string;
  route: string;
}
