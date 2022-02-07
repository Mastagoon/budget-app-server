export class MissingFieldError extends Error {
  code: string
  constructor(message?: string, code?: string) {
    super(message || "Missing Field")
    this.name = "MissingFieldError"
    this.code = code || "MISSING_FIELD"
  }
}
