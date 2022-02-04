import { Field, Float, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne } from "typeorm"
import { TransactionTypes } from "../types"
import BasicEntity from "./BasicEntity"
import Category from "./Category"
import Wallet from "./Wallet"

@ObjectType()
@Entity()
export default class Transaction extends BasicEntity {
    @Field(() => TransactionTypes)
    @Column("int")
    type!: TransactionTypes

    @Field(() => Float, { defaultValue: 0 })
    @Column("float", { default: 0 })
    amount!: number

    @Field(() => String, { nullable: true })
    @Column("varchar", { nullable: true })
    comment?: string

    @Field(() => Category)
    @ManyToOne(() => Category)
    category!: Category

    @Field(() => Wallet)
    @ManyToOne(() => Wallet)
    fromWallet!: Wallet

    @Field(() => Wallet, { nullable: true })
    @ManyToOne(() => Wallet, { nullable: true })
    toWallet?: Wallet
}