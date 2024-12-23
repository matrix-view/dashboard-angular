export class Message {
  id: number;
  name: string;
  lastName: string;
  description: string;
  version: string;

  constructor(message: Message) {
    this.id = message.id;
    this.name = message.name;
    this.lastName = message.lastName;
    this.description = message.description;
    this.version = message.version;
  }
}
