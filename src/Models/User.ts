export class User {
  id?: string
  name: string
  email: string
  cpf: string
  phone: string
  password: string
  userTypeId: number
  createdAt: string
  isAdmin: boolean
  isProfessor: boolean

  constructor() {
    this.name = ""
    this.email = ""
    this.cpf = ""
    this.phone = ""
    this.password = ""
    this.userTypeId = 3
    this.createdAt = ""
    this.isAdmin = false;
    this.isProfessor = false;
  }
}