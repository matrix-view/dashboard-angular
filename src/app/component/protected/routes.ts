import {Route} from "@angular/router";
import {DashboardComponent} from "../view/dashboard/dashboard.component";

export const PROTECTED_FEATURE_ROUTES: Route[] = [
  { path: 'dashboard', component: DashboardComponent },
]
