import { Int, Query, Resolver } from "type-graphql"

@Resolver()
export default class ExampleResolver {
    @Query(() => Int)
    testQuery(): number {
        return 1
    }
}