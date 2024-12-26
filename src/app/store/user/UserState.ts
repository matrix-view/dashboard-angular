import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";


export interface UserState {
  user: any;
}

const initialState: UserState = {
  user: {}
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
