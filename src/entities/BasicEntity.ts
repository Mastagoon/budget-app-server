import { Field, Int, ObjectType } from "type-graphql"
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@ObjectType()
@Entity()
export default class BasicEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number

    @Field(() => Date)
    @CreateDateColumn()
    readonly createdAt?: Date

    @Field(() => Date)
    @UpdateDateColumn()
    readonly updatedAt?: Date

    @Field(() => Date)
    @DeleteDateColumn()
    readonly deletedAt?: Date
}