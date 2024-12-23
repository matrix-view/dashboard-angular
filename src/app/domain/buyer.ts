export class Buyer {
  creditApplicationId?: string;
  name?: string;
  description?: string;
  reference?: string;
  document?: {
    message: string
    quantity: string
  }

  constructor() {
  }
}
