import {Component, input} from '@angular/core';
import {DividerModule} from "primeng/divider";
import {BadgeModule} from "primeng/badge";
import {LabelValueComponent} from "../label-value/label-value.component";
import {ButtonModule} from "primeng/button";
import {CreditRequestState} from "../../../store/credit-retail/credit-retail-state";
import {CustomerInformationComponent} from "./customer-information/customer-information.component";
import {
  buildCreditRequestTranslationConfig,
  getApplicantCreditScoreStipulationsTotalCount,
  getContractDeliveryCount
} from "../../../service/mappers/credit-retail-mapper";
import {PaymentPlanComponent} from "./payment-plan/payment-plan.component";
import {DocumentsDownloadComponent} from "./documents-download/documents-download.component";
import {
  DocumentsUploadCreditRequestComponent
} from "./documents-upload-credit-request/documents-upload-credit-request.component";
import {ContractDeliveryComponent} from "./contract-delivery/contract-delivery.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RemarksComponent} from "./documents-upload-credit-request/document-card/remarks/remarks.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {toObservable} from "@angular/core/rxjs-interop";


export enum CreditRequestDetailActiveItem {
  CUSTOMER_INFORMATION,
  PAYMENT_PLAN,
  DOCUMENTS_DOWNLOAD,
  DOCUMENTS_UPLOAD_CREDIT_REQUEST,
  CONTRACT_DELIVERY,
}

export enum CreditRequestDetailActiveSubItem {
  PENDING_CONTRACT_STIPULATION,
  CONTRACT_DELIVERY_VEHICLE,
}


@Component({
  selector: 'app-credit-request-detail',
  standalone: true,
  imports: [
    DividerModule,
    BadgeModule,
    LabelValueComponent,
    ButtonModule,
    CustomerInformationComponent,
    PaymentPlanComponent,
    DocumentsDownloadComponent,
    DocumentsUploadCreditRequestComponent,
    ContractDeliveryComponent,
    ProgressSpinnerModule,
    RemarksComponent,
    TranslateModule
  ],
  templateUrl: './credit-request-detail.component.html',
  styleUrl: './credit-request-detail.component.scss'
})
export class CreditRequestDetailComponent {

  menuItem = {
    customerInformation: CreditRequestDetailActiveItem.CUSTOMER_INFORMATION,
    paymentPlan: CreditRequestDetailActiveItem.PAYMENT_PLAN,
    documentsDownload: CreditRequestDetailActiveItem.DOCUMENTS_DOWNLOAD,
    documentsUploadCreditRequest: CreditRequestDetailActiveItem.DOCUMENTS_UPLOAD_CREDIT_REQUEST,
    contractDelivery: CreditRequestDetailActiveItem.CONTRACT_DELIVERY,
  }

  activeItem = input<CreditRequestDetailActiveItem>(CreditRequestDetailActiveItem.CUSTOMER_INFORMATION)
  activeSubItem = input<CreditRequestDetailActiveSubItem>()
  activeItemSelected = CreditRequestDetailActiveItem.CUSTOMER_INFORMATION
  activeSubItemSelected: number = CreditRequestDetailActiveSubItem.CONTRACT_DELIVERY_VEHICLE

  creditRequest = input.required<CreditRequestState>()

  translationConfig: any = {}

  constructor(translateService: TranslateService) {
    toObservable(this.activeItem).subscribe(activeItem => this.activeItemSelected = activeItem)
    toObservable(this.activeSubItem).subscribe(activeSubItem => this.activeSubItemSelected = activeSubItem?? CreditRequestDetailActiveSubItem.PENDING_CONTRACT_STIPULATION)
    buildCreditRequestTranslationConfig(translateService).then(translationConfig => this.translationConfig = translationConfig);
  }

  get pageTitle() {
    if (!this.translationConfig) return ""
    switch (this.activeItemSelected) {
      case CreditRequestDetailActiveItem.CUSTOMER_INFORMATION:
        return this.translationConfig['CUSTOMER_INFORMATION']?? ''
      case CreditRequestDetailActiveItem.PAYMENT_PLAN:
        return this.translationConfig['PAYMENT_PLAN']?? ''
      case CreditRequestDetailActiveItem.DOCUMENTS_DOWNLOAD:
        return this.translationConfig['DOCUMENTS_DOWNLOAD']?? ''
      case CreditRequestDetailActiveItem.DOCUMENTS_UPLOAD_CREDIT_REQUEST:
        return this.translationConfig['CREDIT_REQUEST']?? ''
      case CreditRequestDetailActiveItem.CONTRACT_DELIVERY:
        return this.translationConfig['CONTRACT_AND_DELIVERY']?? ''
      default:
        return ""
    }
  }

  get loading(): boolean {
    let isLoading = true
    const creditRequest = this.creditRequest()
    if (creditRequest.customer) {
      isLoading = false
    }
    return isLoading
  }

  get contractDeliveryCount() {
    return `${getContractDeliveryCount(this.creditRequest())}`
  }

  get documentsUploadCreditRequestCount() {
    let result = undefined
    const creditRequest = this.creditRequest()
    if (creditRequest.creditApplicants) {
      result = getApplicantCreditScoreStipulationsTotalCount(this.creditRequest())
    }
    return result
  }

  setActive(item: CreditRequestDetailActiveItem): void {
    this.activeItemSelected = item;
  }

  protected readonly Number = Number;
}
