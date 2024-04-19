export interface IError {
  message?: string
  response?: {
    data?: {
      erros: string[]
    }
  }
}