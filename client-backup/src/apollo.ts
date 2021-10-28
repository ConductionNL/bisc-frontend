import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client'
import introspectionResult from './generated/introspection-result.json'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { accessTokenLocalstorageKey } from './components/Providers/SessionProvider/constants'
import { ErrorLinkHandler } from './utils/errors/ErrorLinkHandler'
import { normalizeIds } from 'utils/normalizeIds'

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
            Authorization: token ? `${token}` : '',
        },
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    new ErrorLinkHandler(graphQLErrors, networkError)
})

/**
 * id's can be provided by the API in either of these formats:
 * - "/<domain>/<uuid>"
 * - "<uuid>"
 *
 * But the API always takes the "<uuid>" format as input.
 * This middleware normalizes the response data to always follow the "<uuid>" format.
 *
 */
const normalizeIdLink = new ApolloLink((operation, forward) => {
    return forward(operation).map(response => {
        if (response.data) {
            response.data = normalizeIds(response.data)
        }

        return response
    })
})

const link = ApolloLink.from([normalizeIdLink, errorLink, authLink.concat(httpLink)])

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
            /**
             * If fetchPolicy is 'network-only', every call to `useExampleQuery()` will result in an actual network call.
             * And since those functions are called in render cycles, every query will run many times before it stops.
             */
            // fetchPolicy: 'network-only',
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
    },
})

export { apolloClient }
