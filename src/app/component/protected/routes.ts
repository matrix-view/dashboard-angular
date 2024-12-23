import {Route} from "@angular/router";
import {PendingComponent} from "../view/credit-requests/pending/pending.component";
import {CreditRequestDetailViewComponent} from "../view/credit-request-detail/credit-request-detail-view.component";
import {PreApprovedComponent} from "../view/credit-requests/pre-approved/pre-approved.component";
import {ApprovedComponent} from "../view/credit-requests/approved/approved.component";
import {DashboardComponent} from "../view/dashboard/dashboard.component";
import {ArchivedComponent} from "../view/credit-requests/archived/archived.component";
import {ActiveContractsComponent} from "../view/contracts/active-contracts/active-contracts.component";

export const PROTECTED_FEATURE_ROUTES: Route[] = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pending-requests/detail/:id', component: CreditRequestDetailViewComponent },
  { path: 'pending-requests/detail/:id/:activeItem', component: CreditRequestDetailViewComponent },
  { path: 'pending-requests/detail/:id/:activeItem/:activeSubItem', component: CreditRequestDetailViewComponent },
  { path: 'pending-requests/pending', component: PendingComponent },
  { path: 'pending-requests/pre-approved', component: PreApprovedComponent },
  { path: 'pending-requests/approved', component: ApprovedComponent },
  { path: 'pending-requests/archived', component: ArchivedComponent },
  { path: 'contracts/active-contracts', component: ActiveContractsComponent },
]
