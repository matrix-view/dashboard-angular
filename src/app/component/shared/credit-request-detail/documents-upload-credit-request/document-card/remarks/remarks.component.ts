import {Component, inject, input} from '@angular/core';
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CreditRequestState} from "../../../../../../store/credit-retail/objects";
import {getCreditRequestRemarks, remarksEntry} from "../../../../../../service/mappers/credit-retail-mapper";
import {UserStore} from "../../../../../../store/user/UserState";
import {CreditRetailStore} from "../../../../../../store/credit-retail/credit-retail-state";
import {CreditRequestService} from "../../../../../../service/credit-request.service";

@Component({
  selector: 'app-remarks',
  standalone: true,
  imports: [
    InputTextareaModule,
    ReactiveFormsModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DialogModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './remarks.component.html',
  styleUrl: './remarks.component.scss'
})
export class RemarksComponent {

  creditRequest = input.required<CreditRequestState>()
  private userStore = inject(UserStore);
  private creditRetailStore = inject(CreditRetailStore)

  remarks = ''
  showModal = false

  constructor(private service: CreditRequestService) {}

  get userName() {
    return this.userStore.user().name
  }

  get creditRequestRemarks(): string[] {
    return getCreditRequestRemarks(this.creditRequest())
  }

  onShowModal() {
    this.showModal = true
  }

  addNewRemark() {
    this.creditRetailStore.addCreditApplicationRemark(this.service, this.creditRequest().creditApplicationId, remarksEntry(this.userName, this.remarks))
    this.remarks = ''
    this.showModal = false
  }

}
