import { Connection } from "typeorm"
import Category from "../entities/Category"
import BasicRepository from "./BasicRepo"

export default class CategoryRepository extends BasicRepository<Category> {
    constructor(dbConnection: Connection) {
        const repo = dbConnection.getRepository(Category)
        super(dbConnection, repo)
    }
}