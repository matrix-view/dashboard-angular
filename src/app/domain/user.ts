import {Dealer} from "./dealer";
import {signal} from "@angular/core";

export class User {
  name: string
  firstName: string
  dealers: Dealer[]

  constructor(name: string, firstName: string, dealers: Dealer[]) {
    this.name = name
    this.firstName = firstName
    this.dealers = dealers
  }

  static mapClaimToUser = (claim: any): User => {
    return {
      name: claim["displayName"],
      firstName: claim["firstName"],
      dealers: User.setDealers(claim["userContext"]),
    } as User
  }

  private static setDealers = (userContext: any[]) => {
    const dealers = signal<Dealer[]>([]);
    userContext.forEach((d: string) => {
      const dealer = Dealer.transformData(d)
      if (dealers().findIndex((d) => d.reference === dealer[0].reference) === -1) {
        dealers().push(dealer[0])
      }
    })
    return dealers()
  }

}
