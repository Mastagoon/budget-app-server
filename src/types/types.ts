import { Request, Response } from "express"
import { ClassType, Field, Float, InputType, Int, ObjectType } from "type-graphql"
import { Connection } from "typeorm"
import Category from "../entities/Category"
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
    console.log("HERE")
    console.log(fields)
    fields.forEach((field: { typeOptions: any }) => {
        const newField = {
            ...field,
            typeOptions: { ...field.typeOptions, nullable: true },
            target: PartialClass,
        }
        metadata.fields.push(newField)
    })

    console.log(metadata)

    return PartialClass
}

@InputType()
export class WalletInput extends PartialType(Wallet) { }

@InputType()
export class CategoryInput extends PartialType(Category) {
    @Field(() => String)
    name!: string
}

@ObjectType()
export class ErrorType {
    @Field(() => String, { nullable: true })
    code?: string
    @Field(() => String)
    message?: string
}

@InputType()
// export class TransactionInput extends PartialType(Transaction) { } #TODO find a way to do this
export class TransactionInput implements Partial<Transaction> {
    @Field(() => TransactionTypes)
    type!: TransactionTypes

    @Field(() => Float)
    amount!: number

    @Field(() => String, { nullable: true })
    comment?: string

    @Field(() => Int, { nullable: true })
    categoryId?: number

    @Field(() => Int)
    transactionWalletId!: number

    @Field(() => Int, { nullable: true })
    secondaryWalletId?: number
}

@ObjectType()
export class TransactionResponse {
    @Field(() => Transaction, { nullable: true })
    transaction?: Transaction
    @Field(() => ErrorType, { nullable: true })
    error?: ErrorType
}

// implements DeepPartial<Transaction> {
//     @Field(() => TransactionTypes)
//     type!: TransactionTypes

//     @Field(() => Float, { defaultValue: 0 })
//     amount!: number
// }

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