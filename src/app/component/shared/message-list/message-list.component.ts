import {Component, EventEmitter, input, Output} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {Message} from "primeng/api";

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
  ],
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.scss'
})
export class MessageListComponent {
  messages = input<Message[]>([])

  @Output() deleteMessage = new EventEmitter<number>();
  delete = (id: number) => this.deleteMessage.emit(id)
}
