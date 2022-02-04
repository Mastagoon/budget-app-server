import { createConnection } from "typeorm"
import config from "../common/config"
import Category from "../entities/Category"
import ExampleEntity from "../entities/ExampleEntity"
import Transaction from "../entities/Transaction"
import Wallet from "../entities/Wallet"

export const createDbConnection = async () => {
    return createConnection({
        type: "mysql",
        host: config.db.host,
        username: config.db.username,
        password: config.db.password,
        database: config.db.db_name,
        synchronize: process.argv.includes("--sync"),
        entities: [ExampleEntity, Wallet, Category, Transaction],
        logging: config.env === "development" || process.argv.includes("--log"),
    })
}