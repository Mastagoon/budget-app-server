export class IllegalArgumentError extends Error {
  code: string
  constructor(message?: string, code?: string) {
    super(message || "Illegal Argument")
    this.name = "IllegalArgumentError"
    this.code = code || "ERR_ILLEGAL_ARGUMENT"
  }
}
