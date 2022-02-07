export class PropertyRequiredError extends Error {
  code: string = "ERR_MISSING_PROPERTY"
  constructor(property: string) {
    super(`${property} is required.`)
    this.name = "GenericError"
  }
}