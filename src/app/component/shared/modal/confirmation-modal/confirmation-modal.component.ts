import {Component, EventEmitter, input, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";

export interface ConfirmationModalComponentEvent {
  show: boolean,
  confirmation: boolean
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule
  ],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

  show = true
  title = input.required<string>()
  content= input.required<string>()
  labelConfirm = input<string>('Confirmation')
  labelCancel = input<string>('Cancel')

  @Output() onEventSend = new EventEmitter<ConfirmationModalComponentEvent>();

  onHide() {
    this.onEventSend.emit({ show: false, confirmation: false })
  }

  onConfirm() {
    this.onEventSend.emit({ show: false, confirmation: true })
  }


}
