import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {firstValueFrom, take} from "rxjs";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

import {HttpClient} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {
    Auth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword
} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    TranslateModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PaginatorModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user = ''
  pass = ''

  angularFireAuth = inject(Auth);


  constructor(router: Router) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) router.navigate(['/protected/dashboard']).then()
    })
  }


  async signIn(): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.angularFireAuth, this.user, this.pass);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`Error occured: ${errorCode} - ${errorMessage}`);
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      await signInWithPopup(this.angularFireAuth, new GoogleAuthProvider())
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(`Error occured: ${errorCode} - ${errorMessage}`);
    }
  }

  async signInWithApple() {
    throw new Error('Not implemented');
  }

}
