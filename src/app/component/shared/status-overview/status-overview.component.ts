import {Component, input} from '@angular/core';
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {styles} from "../../objects";
import {StatusOverviewModelItem} from "../../../service/mappers/credit-retail-mapper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-status-overview',
  standalone: true,
  imports: [
    BadgeModule,
    ButtonModule,
    DividerModule
  ],
  templateUrl: './status-overview.component.html',
  styleUrl: './status-overview.component.scss'
})
export class StatusOverviewComponent {
  title = input.required<string>()
  items = input.required<StatusOverviewModelItem[]>()
  protected readonly styles = styles;

  constructor(private router: Router) {
  }

  navigateTo(redirect?: string) {
    if (redirect) {
      this.router.navigate([`protected/pending-requests/${redirect}`]).then()
    }
  }
}
