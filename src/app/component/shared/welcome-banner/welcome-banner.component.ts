import {Component, inject} from '@angular/core';
import {UserStore} from "../../../store/user/UserState";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CreditRequestService} from "../../../service/credit-request.service";

@Component({
  selector: 'app-welcome-banner',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.scss'
})
export class WelcomeBannerComponent {
  private userStore = inject(UserStore);
  protected userName = this.userStore.user().firstName
  protected readonly UserStore = UserStore;
  welcomeMessage = ""

  constructor(private translate: TranslateService,
  ) {
   this.translate.get('PAGES.DASHBOARD.WELCOME').subscribe(result =>
     this.welcomeMessage = `${result} ${this.userName}!`)
  }

}
