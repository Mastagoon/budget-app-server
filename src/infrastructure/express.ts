import express, { Express } from "express"
import config from "../common/config"

export const createExpressApp = async (): Promise<Express> => {
    const app = express()
    return app
}

export const runExpressServer = (server: Express): void => {
    server.listen(config.port, () =>
        console.log(`Server listening on port ${config.port}`)
    )
}