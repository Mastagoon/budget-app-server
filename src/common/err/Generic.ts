export class GenericError extends Error {
  code: string 
  constructor(message?: string, code?: string) {
    super(message || "Generic error message")
    this.name = "GenericError"
    this.code = code || "GENERIC_ERR"
  }
}
