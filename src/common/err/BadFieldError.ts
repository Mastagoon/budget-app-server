export class BadFieldError extends Error {
  code: string
  constructor(message?: string, code?: string) {
    super(message || "Bad Field")
    this.name = "BadField"
    this.code = code || "BAD_FIELD"
  }
}
