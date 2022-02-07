import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import Wallet from "../entities/Wallet"
import WalletRepository from "../repositories/WalletRepo"
import { ApolloContext, WalletInput } from "../types/types"

@Resolver()
export default class WalletResolver {
    @Mutation(() => Wallet)
    async newWallet(
        @Arg("Wallet", () => WalletInput) trx: Wallet,
        @Ctx() { orm }: ApolloContext
    ): Promise<Wallet> {
        const repo = new WalletRepository(orm)
        return await repo.create(trx)
    }

    @Query(() => [Wallet])
    async allWallets(
        @Ctx() { orm }: ApolloContext
    ): Promise<Wallet[]> {
        const repo = new WalletRepository(orm)
        return await repo.getAll()
    }
}