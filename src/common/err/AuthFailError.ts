export class AuthenticationFailedError extends Error {
  code: string
  constructor(message?: string) {
    super(message || "You are not authenticated.")
    this.name = "AuthenticationFailedError"
    this.code = "NOT_AUTHENTICATED"
  }
}
