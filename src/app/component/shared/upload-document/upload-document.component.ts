import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DocumentPreviewComponent} from "./document-preview/document-preview.component";
import {ConfirmationModalComponent} from "../modal/confirmation-modal/confirmation-modal.component";
import {UploadDocumentModalComponent} from "./modal/upload-document-modal/upload-document-modal.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputIconModule} from "primeng/inputicon";
import {StipulationStatus, StipulationStatusGroup} from "../../../service/mappers/credit-retail-mapper";


export interface UploadDocumentData {
  stipulationStatus: StipulationStatus
  documents: UploadDocumentDataItem[]
  name: string
  icon?: string
  button?: UploadDocumentDataButton
}

export interface UploadDocumentDataItem {
  name: string
  date: string
  creditApplicationId: string
  applicantCreditScoreId: string
  stipulationId: string
  documentId: string
}

export interface UploadDocumentDataButton {
  label: string,
  severity: string,
  icon: string
}

export enum UploadDocumentEventType {
  UPLOAD, DELETE, CLOSE
}

export interface UploadDocumentEvent {
  indexUploading?: number
  type?: UploadDocumentEventType,
  value?: UploadDocumentData,
  document?: UploadDocumentDataItem,
  file?: File
  files?: File[]
  stipulationId?: string
  applicantCreditScoreId?: string
  documentBase64?: string
  description?: string
}

@Component({
  selector: 'app-upload-document',
  standalone: true,
  imports: [
    BadgeModule,
    ButtonModule,
    CardModule,
    DocumentPreviewComponent,
    ConfirmationModalComponent,
    UploadDocumentModalComponent,
    ProgressSpinnerModule,
    InputIconModule
  ],
  templateUrl: './upload-document.component.html',
  styleUrl: './upload-document.component.scss'
})
export class UploadDocumentComponent {

  protected readonly Number = Number;
  uploading = input(false)
  indexUploading = input(-1)
  index = input.required<string>()
  props = input.required<UploadDocumentData>()
  documents = computed(() => this.props().documents)
  @Output() onEventSend = new EventEmitter<UploadDocumentEvent>();
  showModal = false

  get hasDocuments() {
    return !!this.documents()?.length
  }

  get buttonConfig() {
    return this.props()?.button?? {
      label: '', severity: '', icon: ''
    }
  }

  get iconConfig() {
    return this.props()?.icon?? ''
  }

  get stipulationStatus() {
    return this.props().stipulationStatus
  }

  get isStipulationStatusDoesNotRequireUpload() {
    return StipulationStatusGroup.statusDoesNotRequireUpload.includes(this.stipulationStatus)
  }

  get isStipulationStatusNotToBeConsidered() {
    return StipulationStatusGroup.statusNotToBeConsidered.includes(this.stipulationStatus)
  }


  handleDocumentEvent(event: UploadDocumentEvent) {
    this.onEventSend.emit({
      type: event.type, value: this.props()
    })
  }

  onShowModal() {
    this.showModal = true
  }

  onModalEvent(event: UploadDocumentEvent) {
    if (event.type === UploadDocumentEventType.CLOSE) {
      this.showModal = false
    } else if (event.type === UploadDocumentEventType.UPLOAD) {
      this.onEventSend.emit({
        files: event.files,
        type: UploadDocumentEventType.UPLOAD,
        value: this.props(),
        indexUploading: Number(this.index())
      })
      this.showModal = false
    }
  }



}
