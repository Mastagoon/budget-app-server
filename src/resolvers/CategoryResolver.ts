import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import Category from "../entities/Category"
import CategoryRepository from "../repositories/CategoryRepo"
import { ApolloContext, CategoryInput } from "../types/types"


@Resolver()
export default class CategoryResolver {
    @Mutation(() => Category)
    async newCategory(
        @Arg("category", () => CategoryInput) category: CategoryInput,
        @Ctx() { orm }: ApolloContext
    ): Promise<Category> {
        const repo = new CategoryRepository(orm)
        return await repo.create(category)
    }

    @Query(() => [Category])
    async allCategories(
        @Ctx() { orm }: ApolloContext
    ): Promise<Category[]> {
        const repo = new CategoryRepository(orm)
        return await repo.getAll()
    }
}