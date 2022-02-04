import { Request, Response } from "express"
import { ClassType, Field, Float, InputType, ObjectType } from "type-graphql"
import { Connection, DeepPartial } from "typeorm"
import ExampleEntity from "../entities/ExampleEntity"
import Transaction from "../entities/Transaction"
import Wallet from "../entities/Wallet"
import { TransactionTypes } from "./enums"




// inputs
@InputType()
export class ExampleInput implements Partial<ExampleEntity> {
    @Field(() => String)
    name!: string
}

@InputType()
export class TransactionInput implements DeepPartial<Transaction> {
    @Field(() => TransactionTypes)
    type!: TransactionTypes

    @Field(() => Float, { defaultValue: 0 })
    amount!: number
}

export default function PartialType<TClassType extends ClassType>(
    BaseClass: TClassType,
) {
    const metadata = (global as any).TypeGraphQLMetadataStorage

    @ObjectType({ isAbstract: true })
    @InputType({ isAbstract: true })
    class PartialClass extends BaseClass { }

    // Copy relevant fields and create a nullable version on the new type
    const fields = metadata.fields.filter(
        (f: { target: TClassType }) => f.target === BaseClass || BaseClass.prototype instanceof f.target,
    )
    fields.forEach((field: { typeOptions: any }) => {
        const newField = {
            ...field,
            typeOptions: { ...field.typeOptions, nullable: true },
            target: PartialClass,
        }
        metadata.fields.push(newField)
    })

    return PartialClass
}

@InputType()
export class WalletInput extends PartialType(Wallet) { }

// export class WalletInput implements Partial<Wallet> { }


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