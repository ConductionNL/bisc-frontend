import { ApolloServer } from 'apollo-server'
import { typeDefs } from './bisc-taalhuizen-schema-2021-04-16-v2'
import { mocks } from './mocks/index'

const server = new ApolloServer({
    typeDefs,
    mocks: mocks,
})

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})
