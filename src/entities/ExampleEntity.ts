import { Field, ObjectType } from "type-graphql"
import { Column, Entity } from "typeorm"
import BasicEntity from "./BasicEntity"

@ObjectType()
@Entity()
export default class ExampleEntity extends BasicEntity {
    @Field(() => String)
    @Column("varchar")
    name!: string
}