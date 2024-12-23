import {Component, ElementRef, Inject, inject, signal, ViewChild} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Dealer} from "../../../domain/dealer";
import {AvatarModule} from "primeng/avatar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {OverlayModule} from "primeng/overlay";
import {DividerModule} from "primeng/divider";
import {RadioButtonModule} from "primeng/radiobutton";
import {FormsModule} from "@angular/forms";
import {DOCUMENT} from "@angular/common";
import {getUserInitials} from "../../functions";
import {UserStore} from "../../../store/user/UserState";
import {TranslateModule} from "@ngx-translate/core";
import {Auth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {InputIconModule} from "primeng/inputicon";

@Component({
  selector: 'app-header',
  standalone: true,
    imports: [
        ButtonModule,
        AvatarModule,
        OverlayPanelModule,
        OverlayModule,
        DividerModule,
        RadioButtonModule,
        FormsModule,
        TranslateModule,
        InputIconModule
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected dealerSelected = signal<Dealer|undefined>(undefined);
  protected menuClosed = true;

  protected userStore = inject(UserStore)

  protected user = this.userStore.user
    angularFireAuth = inject(Auth);

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {}

  @ViewChild('divUser') divUser?: ElementRef;



  async signOut() {
      await this.angularFireAuth.signOut()
      return this.router.navigate(['/'])
  }

  onDealerSelected(dealer: Dealer) {
    this.dealerSelected.set(dealer);
  }

  setDealer() {
    return this.dealerSelected() ? this.dealerSelected() : this.user().dealers[0];
  }

  protected readonly getUserInitials = getUserInitials;


}
