export class ForgotPassword {
  email: string;
  password: string;
  confirmNewPassword: string;
  newPassword: string;
  tokenRecoverPassword: string;

  constructor() {
    this.confirmNewPassword = "";
    this.email = "";
    this.password = "";
    this.newPassword = "";
    this.tokenRecoverPassword = "";
  }
}
