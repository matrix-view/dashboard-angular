import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Auth} from "@angular/fire/auth";
import {Observable} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Observable(observer => {
    if (auth.currentUser) {
      observer.next(true)
    } else {
      observer.next(router.createUrlTree(['/']))
    }
  })
};

