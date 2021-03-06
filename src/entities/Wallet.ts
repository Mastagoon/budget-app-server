import { Field, Int, ObjectType } from "type-graphql"
import { Column, Entity } from "typeorm"
import { Currencies } from "../types/enums"
import BasicEntity from "./BasicEntity"

@ObjectType()
@Entity()
export default class Wallet extends BasicEntity {
    @Field(() => String)
    @Column("varchar")
    name!: string

    @Field(() => Currencies, { defaultValue: Currencies.USD })
    @Column("varchar", { default: Currencies.USD })
    currency!: Currencies

    @Field(() => Int, { defaultValue: 0 })
    @Column("float", {default: 0})
    credit!: number
}