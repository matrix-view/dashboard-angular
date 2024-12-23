import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {addClickOutsideListener} from "../../functions";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {filter} from "rxjs";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  styleUrl: './sidebar.component.scss',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @ViewChild('section2') section2?: ElementRef;
  @ViewChild('item3') item3?: ElementRef;
  @ViewChild('submenu') subMenu?: ElementRef;

  routes = {
    DEFAULT: "/",
    DASHBOARD: "/protected/dashboard",
    CREDIT_REQUESTS: "/protected/pending-requests",
    ACTIVE_CONTRACTS: "/protected/contracts/active-contracts",
    ARCHIVED_REQUESTS: "/protected/pending-requests/archived",
  }
  subRoutes = {
    PENDING: `${this.routes.CREDIT_REQUESTS}/pending`,
    PRE_APPROVED: `${this.routes.CREDIT_REQUESTS}/pre-approved`,
    AWAITING_DELIVERY: `${this.routes.CREDIT_REQUESTS}/approved`,
  }
  allSubRoutes = [this.subRoutes.PENDING, this.subRoutes.PRE_APPROVED, this.subRoutes.AWAITING_DELIVERY]
  currentRoute = this.routes.DEFAULT
  subClosed = true

  constructor(@Inject(DOCUMENT) private document: Document, router: Router) {
    router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentRoute = event.url
      if (this.verifyCurrentRoute(this.allSubRoutes)) this.openMenu()
    })
  }

  verifyCurrentRoute(routes: string[]) {
    return routes.some(route => this.currentRoute === route)
  }

  openMenu() {
    this.subClosed = false
  }

  ngAfterViewInit() {
    addClickOutsideListener(this.document, 'click', (target) => {
      const isSection2 = this.section2?.nativeElement.contains(target);
      const isItem3 = this.item3?.nativeElement.contains(target);
      const isSubmenu = this.subMenu?.nativeElement.contains(target);

      if (isSection2 && !isItem3 && !isSubmenu) {
        this.subClosed = true
      }
    })
  }

}
