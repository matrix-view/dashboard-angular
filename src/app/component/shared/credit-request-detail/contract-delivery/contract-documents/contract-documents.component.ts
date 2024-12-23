import {Component, inject, input} from '@angular/core';
import {
  CreditRequestState,
  CreditRetailStore,
  FindPendingContractStipulationsResponseState
} from "../../../../../store/credit-retail/credit-retail-state";
import {JsonPipe} from "@angular/common";
import {
  UploadDocumentComponent,
  UploadDocumentData,
  UploadDocumentEvent
} from "../../../upload-document/upload-document.component";
import {
  dateFormat,
  getStipulationStatusByValue,
  StipulationStatus
} from "../../../../../service/mappers/credit-retail-mapper";
import {AppMessageService, MessageType} from "../../../../../service/app-message.service";
import {CreditRequestService} from "../../../../../service/credit-request.service";



@Component({
  selector: 'app-contract-documents',
  standalone: true,
  imports: [
    JsonPipe,
    UploadDocumentComponent
  ],
  templateUrl: './contract-documents.component.html',
  styleUrl: './contract-documents.component.scss'
})
export class ContractDocumentsComponent {

  creditRequest = input.required<CreditRequestState>()
  uploading = false
  indexUploading? = -1
  creditRetailStore = inject(CreditRetailStore)

  constructor(private appMessageService: AppMessageService,
              private creditRequestService: CreditRequestService) {
  }

  get pendingContractsStipulationState() {
    return this.creditRequest().pendingContractsStipulationState
  }

  get stipulations() {
    return this.pendingContractsStipulationState?.stipulations?? []
  }

  buildAppUploadProps(item: any): UploadDocumentData {
    return {
      stipulationStatus: getStipulationStatusByValue(item.stipulationStatus?.enumId),
      documents: [
        // TODO finish
      ],
      name: item.name?? "",
      button: {
        label: item.stipulationStatus?.translation?? '',
        severity: 'success',
        icon: 'pi pi-file'
      },

    }
  }

  async handleUploadEvent(event: UploadDocumentEvent, stipulation: any) {
    if (this.pendingContractsStipulationState && event.files && event.files.length) {
      this.indexUploading = event.indexUploading
      for (const item of event.files) {
        const { stipulationId } = stipulation
        this.uploading = true
        const {pendingContract} = this.pendingContractsStipulationState
        const description = event.description?? ''
        if (stipulationId) {
          try {
            await this.creditRetailStore.uploadPendingContractStipulationsDocuments(
              this.creditRequestService,
              pendingContract.contract?.pendingContractId!,
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
