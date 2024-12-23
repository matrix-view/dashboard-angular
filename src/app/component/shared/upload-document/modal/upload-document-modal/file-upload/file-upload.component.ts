import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {AppMessageService, MessageType} from "../../../../../../service/app-message.service";
import {FileUploadModule} from "primeng/fileupload";
import {BadgeModule} from "primeng/badge";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {InputIconModule} from "primeng/inputicon";
import {CardModule} from "primeng/card";
import {FormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    FileUploadModule,
    BadgeModule,
    NgIf,
    NgForOf,
    JsonPipe,
    InputIconModule,
    CardModule,
    FormsModule,
    InputTextareaModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  @ViewChild('uploadElement') uploadElement: any;

  files = [];
  remarks = ''

  @Output() onCancel = new EventEmitter<void>();
  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadEvent = new EventEmitter<any>();


  constructor(private config: PrimeNGConfig, private messageService: AppMessageService) {}

  get _files() {
    return this.uploadElement?._files;
  }

  get maxSize() {
    return 10485760
  }

  get maxSizeFormatted() {
    return this.formatSize(this.maxSize)
  }

  choose() {
    const element: any = document.getElementsByClassName('p-ripple p-element p-button p-component p-fileupload-choose')[0]
    if (element) {
      element.click()
    }
  }


  removeFile(event: any, index: number): void {
    this.uploadElement.remove(event, index)
  }

  onTemplatedUpload() {
    this.messageService.addMessage(MessageType.INFO, 'Success', 'File Uploaded');
  }

  formatSize(bytes: any) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes!;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  sendUploadEvent() {
    this.onUploadEvent.emit({files: this._files, remarks: this.remarks})
  }

}
