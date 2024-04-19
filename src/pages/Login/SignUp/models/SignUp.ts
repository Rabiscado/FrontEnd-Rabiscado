export class SignUp {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  cep: string;
  confirmPassword: string;
  userTypeId: number;
  createdAt: string;

  constructor() {
    this.name = "";
    this.email = "";
    this.cpf = "";
    this.cep = "";
    this.phone = "";
    this.password = "";
    this.confirmPassword = "";
    this.userTypeId = 3;
    this.createdAt = "";
  }
}
