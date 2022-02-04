import { Connection } from "typeorm"
import ExampleEntity from "../entities/ExampleEntity"
import BasicRepository from "./BasicRepo"

export default class ExampleRepository extends BasicRepository<ExampleEntity> {
    constructor(dbConnection: Connection) {
        const repo = dbConnection.getRepository(ExampleEntity)
        super(dbConnection, repo)
    }

}