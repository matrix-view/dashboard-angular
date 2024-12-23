import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {CardModule} from "primeng/card";
import {UploadDocumentDataItem, UploadDocumentEvent, UploadDocumentEventType} from "../upload-document.component";
import {ButtonModule} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {CreditRequestService} from "../../../../service/credit-request.service";
import {AppMessageService, MessageType} from "../../../../service/app-message.service";
import {
  ConfirmationModalComponent,
  ConfirmationModalComponentEvent
} from "../../modal/confirmation-modal/confirmation-modal.component";
import {CreditRetailStore} from "../../../../store/credit-retail/credit-retail-state";
import {InputIconModule} from "primeng/inputicon";

@Component({
  selector: 'app-document-preview',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    ConfirmationModalComponent,
    InputIconModule
  ],
  templateUrl: './document-preview.component.html',
  styleUrl: './document-preview.component.scss'
})
export class DocumentPreviewComponent {

  loading = false
  showConfirmationModal = false

  creditRetailStore = inject(CreditRetailStore)

  document = input.required<UploadDocumentDataItem>()
  @Output() onEventSend = new EventEmitter<UploadDocumentEvent>();

  constructor(private creditRequestService: CreditRequestService,
              public appMessageService: AppMessageService) {
  }

  onShowConfirmationModal() {
    this.showConfirmationModal = true
  }

  onConfirmationModalEvent(event: ConfirmationModalComponentEvent) {
    this.showConfirmationModal = event.show
    if (event.confirmation) {
      this.loading = true
      this.creditRetailStore.deleteApplicantStipulationsDocuments(
        this.creditRequestService,
        this.document().creditApplicationId,
        this.document().applicantCreditScoreId,
        this.document().stipulationId,
        this.document().documentId
      ).then(async data => {
        if (data) {
          this.onEventSend.emit({
            type: UploadDocumentEventType.DELETE
          })
          this.loading = false
          this.appMessageService.addMessage(MessageType.SUCCESS, 'Delete document', 'Successfully deleted document')
        }
      }).catch(() => this.loading = false)
    }
  }


  protected readonly alert = alert;
}
