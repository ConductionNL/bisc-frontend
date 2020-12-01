import { ApolloClient, createHttpLink, gql, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

@Injectable()
export class PersonRepository {
    private client: ApolloClient<NormalizedCacheObject>

    public constructor(private configService: ConfigService<Config>) {
        const httpLink = createHttpLink({
            uri: 'https://cc.dev.conduction.nl/graphql',
            fetch,
            headers: {
                Authorization: configService.get('API_KEY'),
            },
        })

        this.client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        })
    }
    public async findPersons() {
        // TODO: Try codegen
        const query = gql(`
        {
            people {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }          
        `)

        const result = await this.client.query({ query })

        return result.data.people.edges
    }
}
