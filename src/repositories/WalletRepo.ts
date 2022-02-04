import { Connection } from "typeorm"
import Wallet from "../entities/Wallet"
import BasicRepository from "./BasicRepo"

export default class WalletRepository extends BasicRepository<Wallet> {
    constructor(dbConnection: Connection) {
        const repo = dbConnection.getRepository(Wallet)
        super(dbConnection, repo)
    }
}