import { ApolloClient, createHttpLink, DefaultOptions, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch')

@Injectable()
export class CommonGroundAPIService {
    public constructor(private configService: ConfigService<Config>) {}

    public createAPIClient(graphqlUri: string): ApolloClient<NormalizedCacheObject> {
        // This is to disable caching, see https://stackoverflow.com/a/48549667/2695897
        const defaultOptions: DefaultOptions = {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        }

        const httpLink = createHttpLink({
            uri: graphqlUri,
            fetch,
            headers: {
                Authorization: this.configService.get('API_KEY'),
            },
        })

        const apolloClient = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
            defaultOptions,
        })

        return apolloClient
    }
}
