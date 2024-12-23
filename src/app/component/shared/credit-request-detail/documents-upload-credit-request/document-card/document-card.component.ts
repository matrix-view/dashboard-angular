import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {BadgeModule} from "primeng/badge";
import {ButtonModule} from "primeng/button";
import {LabelValueComponent} from "../../../label-value/label-value.component";
import {ApplicantCreditScoreStipulationModel} from "../../../../../domain/credit-retail";
import {CardModule} from "primeng/card";
import {
  UploadDocumentComponent,
  UploadDocumentData,
  UploadDocumentEvent
} from "../../../upload-document/upload-document.component";
import {CreditRequestState} from "../../../../../store/credit-retail/objects";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {RemarksComponent} from "./remarks/remarks.component";
import moment from "moment";
import {dateFormat, getStipulationStatusByValue} from "../../../../../service/mappers/credit-retail-mapper";

@Component({
  selector: 'app-document-card',
  standalone: true,
  imports: [
    BadgeModule,
    ButtonModule,
    LabelValueComponent,
    CardModule,
    UploadDocumentComponent,
    InputTextareaModule,
    PaginatorModule,
    RemarksComponent
  ],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent {

  uploading = input(false)
  indexUploading = input(-1)
  index = input.required<string>()
  creditRequest = input.required<CreditRequestState>()
  stipulation = input.required<ApplicantCreditScoreStipulationModel>()
  applicantCreditScoreId = input.required<string>()
  documents = computed(() => this.stipulation().documents?? [])
  @Output() onEventSend = new EventEmitter<UploadDocumentEvent>();

  get appUploadProps(): UploadDocumentData {
    return {
      stipulationStatus: getStipulationStatusByValue(this.stipulation().stipulationStatus?.enumId),
      documents: this.documents().map((item) => {
        return {
          creditApplicationId: this.creditRequest().creditApplicationId?? "",
          stipulationId: item.stipulationId?? "",
          documentId: item.documentId?? "",
          name: item.name?.translation?? "",
          date: item.creationDate ? moment(item.creationDate).format(dateFormat) : "",
          applicantCreditScoreId: this.applicantCreditScoreId(),
        }
      }),
      name: this.stipulation().name?? "",
      icon: 'pi pi-info-circle',
      button: {
        label: this.stipulation().stipulationStatus?.translation?? '',
        severity: 'success',
        icon: 'pi pi-file'
      },
    }
  }

  handleUploadEvent(event: UploadDocumentEvent) {
    event.stipulationId = this.stipulation().stipulationId
    event.applicantCreditScoreId = this.applicantCreditScoreId()
    this.onEventSend.emit(event)
  }

}
