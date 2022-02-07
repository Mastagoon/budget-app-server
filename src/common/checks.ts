import { IllegalArgumentError } from "./err/IllegalArgumentError"
import { PropertyRequiredError } from "./err/PropertyRequiredError"

export const denyIfNotSet = (
    target: unknown | null | undefined,
    keys: string[],
    message?: string
) => {
    if (target === undefined || target === null)
        throw new IllegalArgumentError(message)
    if (typeof target !== "object") throw new IllegalArgumentError(message)
    keys.forEach((key) => {
        if (!(key in target!)) throw new PropertyRequiredError(key)
    })
}