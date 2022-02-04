import { Connection, DeepPartial, DeleteResult, Repository } from "typeorm"

export default class BaseRepository<T> {
    protected dbConnection: Connection
    protected repository: Repository<T>

    constructor(dbConnection: Connection, repository: Repository<T>) {
        this.dbConnection = dbConnection
        this.repository = repository
    }

    public async getById(id: number): Promise<T | null> {
        const result = await this.repository.findOne(id)
        if (!result) return null
        return result
    }

    // public async getMany(amt: number, from: ) #TODO pagination

    public async getAll(): Promise<T[]> {
        const result = await this.repository.find({})
        return result
    }

    public async create(input: DeepPartial<T>): Promise<T> {
        const t = this.repository.create(input)
        return await this.repository.save(t)
    }

    // public async update() => {} #TODO update

    public async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id)
    }

}