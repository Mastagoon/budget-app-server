import "reflect-metadata"
import { Connection } from "typeorm"
import defaultCategories from "../data/defaultCategories"
import Category from "../entities/Category"

export const seedCategories = async (orm: Connection) => {
    const repository = orm.getRepository(Category)
    repository.insert(defaultCategories)
}
