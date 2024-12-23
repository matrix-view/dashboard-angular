import {EventEmitter, Injectable} from '@angular/core';
import {Message} from "primeng/api";

export enum MessageType {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  CUSTOM = 'custom',
}


@Injectable({
  providedIn: 'root'
})
export class AppMessageService {

  private queue: EventEmitter<Message[]> = new EventEmitter<Message[]>()

  messages: Message[] = [];

  constructor() { }

  getMessages() {
    return this.queue
  }

  addMessage(severity: MessageType, summary: string, detail: string) {
    this.messages.push({severity, summary, detail})
    this.queue.emit(this.messages)
    this.clear()
  }

  clear() {
    setTimeout(() => {
      this.messages = this.messages.slice(1)
      this.queue.emit(this.messages)
    }, 3000)
  }


}
