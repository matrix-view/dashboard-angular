import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ViewportScroller} from "@angular/common";
import {HeaderComponent} from "./component/infra/header/header.component";
import {SidebarComponent} from "./component/infra/sidebar/sidebar.component";
import {ButtonModule} from "primeng/button";
import {CreditRequestService} from "./service/credit-request.service";
import {CreditRetailStore} from "./store/credit-retail/credit-retail-state";
import {AppMessageService} from "./service/app-message.service";
import {Message, MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {TranslateService} from "@ngx-translate/core";
import {Auth} from "@angular/fire/auth";
import {Observable} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    ButtonModule,
    MessagesModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService]
})
export class AppComponent {

  private creditRetailStore = inject(CreditRetailStore)
  messages: Message[] = [];

  isAuthenticated = false;

  angularFireAuth = inject(Auth);

  constructor(private router: Router,
              service: CreditRequestService,
              private viewportScroller: ViewportScroller,
              translate: TranslateService,
              public appMessageService: AppMessageService,
              ) {
    translate.setDefaultLang('en');

    this.angularFireAuth.onAuthStateChanged(next => {
      this.isAuthenticated = !!next?.uid
    })


    appMessageService.getMessages().subscribe(messages => this.messages = messages)
    // this.isAuthenticated$.subscribe(isAuthenticated => {
    //   if (router.url.includes('protected') && !isAuthenticated) {
    //     router.navigate(['']).then()
    //   }
    // })
    // this.creditRetailStore.getCreditApplications(service)

    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.viewportScroller.scrollToPosition([0, 0]);
    //   }
    // });
  }


  // isAuthenticated$ = this.oktaStateService.authState$.pipe(
  //   filter((s: AuthState) => !!s),
  //   map((s: AuthState) => {
  //     return s.isAuthenticated ?? false
  //   } )
  // )

}
