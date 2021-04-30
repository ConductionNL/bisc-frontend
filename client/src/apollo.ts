import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'
import introspectionResult from './generated/introspection-result.json'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { accessTokenLocalstorageKey } from './components/Providers/SessionProvider/constants'
import { ErrorLinkHandler } from './utils/errors/ErrorLinkHandler'

const httpLink = createHttpLink({
    uri: window.ENVIRONMENT.GRAPHQL_URI,
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(accessTokenLocalstorageKey)
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            // Authorization: token ? `${token}` : '',
            // TODO: use users token to authorize calls

            Authorization: '8b55691f-346d-423c-bdcf-3f5365806d39', // fixed api key
        },
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    new ErrorLinkHandler(graphQLErrors, networkError)
})

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)])

const apolloClient = new ApolloClient({
    link: link,
    uri: window.ENVIRONMENT.GRAPHQL_URI,
    cache: new InMemoryCache({
        possibleTypes: introspectionResult.possibleTypes,
    }),
    defaultOptions: {
        query: {
            errorPolicy: 'all',
        },
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})

export { apolloClient }
