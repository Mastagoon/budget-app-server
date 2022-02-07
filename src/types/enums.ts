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

export enum CategoryTypes {
    EXPENSE = 0,
    INCOME
}

registerEnumType(CategoryTypes, { name: "CategoryTypes" })
registerEnumType(Currencies, { name: "Currencies" })
registerEnumType(TransactionTypes, { name: "TransactionTypes" })