import { createConnection } from "typeorm"
import config from "../common/config"
import ExampleEntity from "../entities/ExampleEntity"

export const createDbConnection = async () => {
    return createConnection({
        type: "mysql",
        host: config.db.host,
        username: config.db.username,
        password: config.db.password,
        database: config.db.db_name,
        synchronize: process.argv.includes("--sync"),
        entities: [ExampleEntity],
        logging: config.env === "development" || process.argv.includes("--log"),
    })
}