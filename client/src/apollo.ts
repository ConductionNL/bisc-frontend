import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClient = new ApolloClient({
    uri: window.ENVIRONMENT.GRAPHQL_URI,
    // cache: new InMemoryCache({
    //     possibleTypes: introspectionResult.possibleTypes,
    // }),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            errorPolicy: 'all',
        },
        watchQuery: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})

export { apolloClient }
