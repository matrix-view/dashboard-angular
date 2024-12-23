import {Component, computed, inject} from '@angular/core';
import {PreApprovedCardComponent} from "../../shared/pre-approved-card/pre-approved-card.component";
import {CreditRetailStore} from "../../../store/credit-retail/credit-retail-state";
import {mapCreditPreApprovedListToPreApprovedCreditRequests} from "../../../service/mappers/credit-retail-mapper";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-recently-pre-approved',
  standalone: true,
  imports: [
    PreApprovedCardComponent,
    RouterLink
  ],
  templateUrl: './recently-pre-approved.component.html',
  styleUrl: './recently-pre-approved.component.scss'
})
export class RecentlyPreApprovedComponent {

  creditRetailStore = inject(CreditRetailStore)
  creditsPreApproved = computed(() => this.creditRetailStore.preApproved()
    .map(item => mapCreditPreApprovedListToPreApprovedCreditRequests(item))
    .slice(0, 4)
  )

  constructor(private router: Router) {}

  navigateToDetail(creditApplicationId?: string) {
    if (creditApplicationId) {
      this.router.navigate([`protected/pending-requests/detail/${creditApplicationId}`]).then()
    }
  }

}
