import { Connection } from "typeorm"
import Transaction from "../entities/Transaction"
import BasicRepository from "./BasicRepo"

export default class TransactionRepository extends BasicRepository<Transaction> {
    constructor(dbConnection: Connection) {
        const repo = dbConnection.getRepository(Transaction)
        super(dbConnection, repo)
    }
}