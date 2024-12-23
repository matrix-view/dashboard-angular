import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {User} from "../../domain/user";

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: new User('', '', [])
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(({user, ...store}) => ({
    // getClaims: (service: AuthService) => {
    //   return service.getClaims$().subscribe((claim: unknown) => {
    //     patchState(store, {user: User.mapClaimToUser(claim)})
    //   })
    // }
  })),
)
