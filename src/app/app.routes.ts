import {Routes} from '@angular/router';
import {PageNotFoundComponent} from "./component/view/page-not-found/page-not-found.component";
import {LoginComponent} from "./component/view/login/login.component";
import {authGuard} from "./component/infra/auth/auth.guard";

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'protected',
    loadChildren: () => import('./component/protected/routes').then(m => m.PROTECTED_FEATURE_ROUTES),
    canActivate: [authGuard]
  },
  { path: '**', component: PageNotFoundComponent },
];
