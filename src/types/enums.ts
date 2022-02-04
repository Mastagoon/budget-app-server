import { registerEnumType } from "type-graphql"

// enums
export enum TransactionTypes {
    EXPENSE = 0,
    INCOME,
    TRANSFER
}

export enum Currencies {
    USD = "USD",
    SDG = "SGD",
    SAR = "SAR"
}

registerEnumType(Currencies, { name: "Currencies" })
registerEnumType(TransactionTypes, { name: "TransactionTypes" })