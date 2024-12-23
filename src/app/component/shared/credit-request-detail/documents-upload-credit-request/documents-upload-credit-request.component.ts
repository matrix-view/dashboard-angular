import {Component, computed, inject, input} from '@angular/core';
import {CreditRequestState, CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {JsonPipe} from "@angular/common";
import {LabelValueComponent} from "../../label-value/label-value.component";
import {ButtonModule} from "primeng/button";
import {ContractDeliveryComponent} from "../contract-delivery/contract-delivery.component";
import {CustomerInformationComponent} from "../customer-information/customer-information.component";
import {DocumentsDownloadComponent} from "../documents-download/documents-download.component";
import {PaymentPlanComponent} from "../payment-plan/payment-plan.component";
import {BadgeModule} from "primeng/badge";
import {DocumentCardComponent} from "./document-card/document-card.component";
import {UploadDocumentComponent, UploadDocumentEvent} from "../../upload-document/upload-document.component";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {AppMessageService, MessageType} from "../../../../service/app-message.service";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-documents-upload-credit-request',
  standalone: true,
  imports: [
    JsonPipe,
    LabelValueComponent,
    ButtonModule,
    ContractDeliveryComponent,
    CustomerInformationComponent,
    DocumentsDownloadComponent,
    PaymentPlanComponent,
    BadgeModule,
    DocumentCardComponent,
    InputTextareaModule,
    ReactiveFormsModule,
    UploadDocumentComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './documents-upload-credit-request.component.html',
  styleUrl: './documents-upload-credit-request.component.scss'
})
export class DocumentsUploadCreditRequestComponent {

  protected readonly String = String;

  uploading = false
  indexUploading? = -1

  creditRequest = input.required<CreditRequestState>()
  stipulations = computed<any[]>(
    () => {
      const result: any[] = []
      this.creditRequest().creditApplicants?.forEach(creditApplicant =>
        creditApplicant.applicantCreditScoreStipulations.stipulations.forEach(
          (stipulation: any) => {
            const documents = creditApplicant.applicantCreditScoreStipulationsDocuments.documents
              .filter((d: any) => d.stipulationId === stipulation.stipulationId)
            result.push({
              documents,
              applicantCreditScoreId: creditApplicant.applicantCreditScoreId,
              ...stipulation
            })
          }))
      return result
    }
  )

  creditRetailStore = inject(CreditRetailStore)

  constructor(private creditRequestService: CreditRequestService,
              public appMessageService: AppMessageService) {
    setTimeout(() => console.log(this.creditRequest()), 2000)
  }

  async handleUploadEvent(event: UploadDocumentEvent) {
    if (event.files && event.files.length) {
      this.indexUploading = event.indexUploading
      for (const item of event.files) {
        const {
          stipulationId,
          applicantCreditScoreId
        } = event
        this.uploading = true
        const creditApplicationId = this.creditRequest().creditApplicationId
        const description = event.description?? ''
        if (stipulationId && applicantCreditScoreId) {
          try {
            await this.creditRetailStore.uploadApplicantStipulationsDocuments(
              this.creditRequestService,
              creditApplicationId,
              applicantCreditScoreId,
              stipulationId,
              description,
              item,
            )
          } catch (e) {
            this.appMessageService.addMessage(MessageType.ERROR, "Document Upload", "Error when uploading documents")
            console.error('Error uploading the document', e, event)
          }
        }
      }
      this.uploading = false
      this.indexUploading = -1
    }
  }

}
