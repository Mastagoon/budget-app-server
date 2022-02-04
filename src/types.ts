import { Request, Response } from "express"
import { Field, InputType, registerEnumType } from "type-graphql"
import { Connection } from "typeorm"
import ExampleEntity from "./entities/ExampleEntity"

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


// inputs
@InputType()
export class ExampleInput implements Partial<ExampleEntity> {
    @Field(() => String)
    name!: string
}

// @InputType()
// export class EntityEnpity implements Partial<T> {
    
// }

// export const getInputType = () => {

// }
// @InputType()
// export class Omit<ExampleEntity, "id"> {}


// other
export type ApolloContext = {
    orm: Connection,
    req: Request,
    res: Response
}