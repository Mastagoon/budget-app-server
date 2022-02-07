export class UnauthorizedError extends Error {
  code: string;
  constructor(message?: string) {
    super(message || 'Unauthorized.');
    this.name = 'UnauthorizedError';
    this.code = "NO_PERMISSION"
  }
}
