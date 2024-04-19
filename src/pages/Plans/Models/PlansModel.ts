export class Plan {
  id?: number;
  name: string;
  description: string;
  price: number;
  coinValue: number;
  disabled: boolean;

  constructor() {
    this.coinValue = 0;
    this.description = "";
    this.disabled = false;
    this.name = "";
    this.price = 0;
  }
}
