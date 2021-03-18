import { ServerError, ServerParseError } from '@apollo/client'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../components/Core/Feedback/Notifications/NotificationsManager'

export class ErrorLinkHandler {
    public constructor(
        private readonly graphQLErrors: readonly GraphQLError[] | undefined,
        private readonly networkError: Error | ServerError | ServerParseError | undefined
    ) {
        if (this.graphQLErrors) {
            this.handleGraphqlErrors()
        }

        if (this.networkError) {
            this.handleNetworkErrors()
        }
    }

    private handleGraphqlErrors() {
        this.graphQLErrors?.forEach(({ message, locations, path }) => {
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
            NotificationsManager.success(message, 'test')
        })
    }

    private handleNetworkErrors() {
        console.log(`[Network error]: ${this.networkError}`)
        NotificationsManager.success('test', 'test')
    }
}
