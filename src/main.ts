import dotenv from "dotenv"
dotenv.config({ path: __dirname + "/.env" })
import "reflect-metadata"
import { createApolloServer } from "./infrastructure/apollo"
import { createExpressApp, runExpressServer } from "./infrastructure/express"
import { createDbConnection } from "./infrastructure/typeorm"
import { seedCategories } from "./scripts/seed"

const main = async (): Promise<void> => {
    const orm = await createDbConnection()
    const app = await createExpressApp()
    createApolloServer(orm, app)
    runExpressServer(app)
    if (process.argv.includes("--seed")) seedCategories(orm)
}

main()

