import { Field, ObjectType } from "type-graphql"
import { Column, Entity } from "typeorm"
import { CategoryTypes } from "../types/enums"
import BasicEntity from "./BasicEntity"


@ObjectType()
@Entity()
export default class Category extends BasicEntity {
    @Field(() => String)
    @Column("varchar")
    name!: string

    @Field(() => CategoryTypes)
    @Column("varchar")
    type!: CategoryTypes
}