import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import Transaction from "../entities/Transaction"
import TransactionRepository from "../repositories/TransactionRepo"
import { ApolloContext, TransactionInput } from "../types/types"

@Resolver()
export default class TransactionResolver {
    @Mutation(() => Transaction)
    async newTransaction(
        @Arg("transaction", () => TransactionInput) trx: TransactionInput,
        @Ctx() { orm }: ApolloContext
    ): Promise<Transaction> {
        const repo = new TransactionRepository(orm)
        return await repo.create(trx)
    }
}