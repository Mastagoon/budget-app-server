import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql"
import ExampleEntity from "../entities/ExampleEntity"
import ExampleRepository from "../repositories/ExampleRepo"
import { ApolloContext, ExampleInput } from "../types"

@Resolver()
export default class ExampleResolver {
    @Query(() => Int)
    testQuery(): number {
        return 1
    }

    @Mutation(() => ExampleEntity)
    async createNewExample(
        @Arg("example", () => ExampleInput) example: ExampleInput,
        @Ctx() { orm }: ApolloContext
    ): Promise<ExampleEntity | null> {
        const repo = new ExampleRepository(orm)
        const result = await repo.create(example)
        return result
    }
}