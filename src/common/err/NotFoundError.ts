export class NotFoundError extends Error {
  code: string
  constructor(message?: string, code?: string) {
    super(message || "Not Found")
    this.name = "NotFoundError"
    this.code = code || "NOT_FOUND"
  }
}
