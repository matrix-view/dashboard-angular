import {Component, inject, signal} from '@angular/core';
import {MenuItem, PrimeTemplate} from "primeng/api";
import {MenubarModule} from "primeng/menubar";
import {AvatarModule} from "primeng/avatar";
import {getUserInitials} from "../../../functions";
import {BadgeModule} from "primeng/badge";
import {OverlayModule} from "primeng/overlay";
import {TranslateModule} from "@ngx-translate/core";
import {Auth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    MenubarModule,
    PrimeTemplate,
    AvatarModule,
    BadgeModule,
    OverlayModule,
    TranslateModule,
    DividerModule
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {

  angularFireAuth = inject(Auth)
  router = inject(Router)
  items: MenuItem[] = []
  protected readonly getUserInitials = getUserInitials;
  menuClosed = true

  user = signal({
    name: 'Neo'
  })

  ngOnInit() {
    this.items = [
      {
        label:'File',
        icon:'pi pi-fw pi-file',
        items:[
          {
            label:'New',
            icon:'pi pi-fw pi-plus',
            items:[
              {
                label:'Bookmark',
                icon:'pi pi-fw pi-bookmark'
              },
              {
                label:'Video',
                icon:'pi pi-fw pi-video'
              },

            ]
          },
          {
            label:'Delete',
            icon:'pi pi-fw pi-trash'
          },
          {
            label:'Export',
            icon:'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label:'Edit',
        icon:'pi pi-fw pi-pencil',
        items:[
          {
            label:'Left',
            icon:'pi pi-fw pi-align-left'
          },
          {
            label:'Right',
            icon:'pi pi-fw pi-align-right'
          },
          {
            label:'Center',
            icon:'pi pi-fw pi-align-center'
          },
          {
            label:'Justify',
            icon:'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label:'Users',
        icon:'pi pi-fw pi-user',
        items:[
          {
            label:'New',
            icon:'pi pi-fw pi-user-plus',

          },
          {
            label:'Delete',
            icon:'pi pi-fw pi-user-minus',

          },
          {
            label:'Search',
            icon:'pi pi-fw pi-users',
            items:[
              {
                label:'Filter',
                icon:'pi pi-fw pi-filter',
                items:[
                  {
                    label:'Print',
                    icon:'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon:'pi pi-fw pi-bars',
                label:'List'
              }
            ]
          }
        ]
      },
      {
        label:'Events',
        icon:'pi pi-fw pi-calendar',
        items:[
          {
            label:'Edit',
            icon:'pi pi-fw pi-pencil',
            items:[
              {
                label:'Save',
                icon:'pi pi-fw pi-calendar-plus'
              },
              {
                label:'Delete',
                icon:'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label:'Archieve',
            icon:'pi pi-fw pi-calendar-times',
            items:[
              {
                label:'Remove',
                icon:'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      }
    ];
  }


  async signOut() {
    await this.angularFireAuth.signOut()
    return this.router.navigate(['/'])
  }

}
