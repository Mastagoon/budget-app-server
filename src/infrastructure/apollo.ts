import { ApolloServer } from "apollo-server-express"
import { Express } from "express"
import { buildSchema } from "type-graphql"
import { Connection } from "typeorm"
import ExampleResolver from "../resolvers/ExampleResolver"

// const getContext = async (
//   req: Request,
//   orm: Connection
// ): Promise<ApolloContext> => {
//   const userId = req.session.userId
//   // const token = req?.headers["authorization"]?.split(" ")[1]
//   if (!userId) return { orm, actor: null, req }
//   try {
//     // const secret = getConfig().jwt_secret
//     // const userId = jwt.verify(token, secret) as string
//     const repository = new UserRepository(orm)
//     const user = await repository.getById(userId)
//     return { orm, actor: user, req }
//   } catch (err: any) {
//     return { orm, actor: null, req }
//   }
// }

export const createApolloServer = async (orm: Connection, app: Express) => {
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
           resolvers: [ExampleResolver]
        }),
        // context: ({ req }) => getContext(req, orm),
        context: ({ req }) => { req }
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
    return apolloServer
}

