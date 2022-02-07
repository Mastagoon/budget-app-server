import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { denyIfNotSet } from "../common/checks"
import { GenericError } from "../common/err/Generic"
import { NotFoundError } from "../common/err/NotFoundError"
import Transaction from "../entities/Transaction"
import Wallet from "../entities/Wallet"
import TransactionRepository from "../repositories/TransactionRepo"
import { TransactionTypes } from "../types/enums"
import { ApolloContext, TransactionInput, TransactionResponse } from "../types/types"
import formatErr from "../util/formatErr"

@Resolver()
export default class TransactionResolver {
    @Mutation(() => TransactionResponse)
    async newTransaction(
        @Arg("transaction", () => TransactionInput) trx: TransactionInput,
        @Ctx() { orm }: ApolloContext
    ): Promise<TransactionResponse> {
        try {
            denyIfNotSet(trx, ["amount", "categoryId", "transactionWalletId"])
            const walletRepo = orm.getRepository(Wallet)
            const transactionWallet = await walletRepo.findOne(trx.transactionWalletId)
            if (!transactionWallet) throw new NotFoundError("Wallet not found")
            switch (trx.type) {
                case TransactionTypes.INCOME:
                    transactionWallet.credit += trx.amount
                    await walletRepo.save(transactionWallet)
                    break

                case TransactionTypes.EXPENSE:
                    transactionWallet.credit -= trx.amount
                    await walletRepo.save(transactionWallet)
                    break

                case TransactionTypes.TRANSFER:
                    denyIfNotSet(trx, ["secondaryWalletId"])
                    const secondaryWallet = await walletRepo.findOne(trx.secondaryWalletId)
                    if (!secondaryWallet) throw new NotFoundError("Wallet not found")
                    if(transactionWallet.id === secondaryWallet.id) throw new GenericError("Cannot transfer to same wallet", "SAME_WALLET_ERR")
                    transactionWallet.credit -= trx.amount
                    secondaryWallet.credit += trx.amount
                    await walletRepo.save(transactionWallet)
                    await walletRepo.save(secondaryWallet)
                    break
            }
            
            
            const repo = new TransactionRepository(orm)
            console.log(trx)
            return {
                transaction: await repo.create(trx)
            }
        } catch (err: any) {
            return formatErr(err)
        }

    }

    @Query(() => [Transaction])
    async allTransactionx(
        @Ctx() { orm }: ApolloContext
    ): Promise<Transaction[]> {
        const repo = new TransactionRepository(orm)
        return await repo.getAll()
    }
}