import {Component, EventEmitter, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {UploadDocumentEvent, UploadDocumentEventType} from "../../upload-document.component";
import {InputGroupModule} from "primeng/inputgroup";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";

export interface UploadDocumentModalComponentFile {
  file: File
  name: string
  size: string
}

@Component({
  selector: 'app-upload-document-modal',
  standalone: true,
  imports: [
    DialogModule,
    InputGroupModule,
    ButtonModule,
    FormsModule,
    JsonPipe,
    CardModule,
    InputTextareaModule,
    IconFieldModule,
    InputIconModule,
    FileUploadComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './upload-document-modal.component.html',
  styleUrl: './upload-document-modal.component.scss'
})
export class UploadDocumentModalComponent {

  show = true
  files: UploadDocumentModalComponentFile[] = []
  remarks = ""
  @Output() onEventSend = new EventEmitter<UploadDocumentEvent>();

  onHide() {
    this.onEventSend.emit({ type: UploadDocumentEventType.CLOSE })
  }

  handleUploadEvent(event: any) {
    const { files, remarks } = event
    this.files = files
    this.remarks = remarks
    this.onEventSend.emit({
      type: UploadDocumentEventType.UPLOAD,
      files,
      description: remarks
    })
    this.show = false
  }

}
