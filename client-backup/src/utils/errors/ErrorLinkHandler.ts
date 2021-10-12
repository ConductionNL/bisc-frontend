import { ServerError, ServerParseError } from '@apollo/client'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../components/Core/Feedback/Notifications/NotificationsManager'
import { EntityAlreadyExistsHandler } from './ErrorCodeHandlers/EntityAlreadyExistsHandler'
import { InputErrorsHandler } from './ErrorCodeHandlers/InputErrorsHandler'
import { genericErrorTranslations } from './translations'
import { ErrorCode } from './types'

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
        this.graphQLErrors?.forEach(graphQLError => {
            // eslint-disable-next-line no-console
            console.log(
                `[GraphQL error]: Message: ${graphQLError.message}, Location: ${graphQLError.locations}, Path: ${graphQLError.path}`
            )

            this.handleAppError(graphQLError)
        })
    }

    private handleAppError(graphQLError: GraphQLError) {
        if (graphQLError.extensions) {
            this.handleExtensions(graphQLError)
            return
        }
    }

    private handleExtensions(graphQLError: GraphQLError) {
        const errorCode = graphQLError.extensions?.exception?.response?.errorCode as string

        switch (errorCode) {
            case ErrorCode.InputValidation:
                new InputErrorsHandler(graphQLError)
                break
            case ErrorCode.EntityAlreadyExists:
                new EntityAlreadyExistsHandler(graphQLError)
                break

            default:
                this.handleGenericErrors(errorCode)
                break
        }
    }

    private handleGenericErrors(errorCode: string) {
        const translation = genericErrorTranslations.find(translation => translation.errorCode === errorCode)
        if (translation) {
            NotificationsManager.error(translation.title, translation.message)
            return
        }
        NotificationsManager.error(i18n._(t`Wij konden de gegevens niet ophalen`), i18n._(t`Probeer het later opnieuw`))
    }

    private handleNetworkErrors() {
        NotificationsManager.error(
            i18n._(t`Wij kunnen geen verbinding maken met onze services`),
            i18n._(t`Probeer het later opnieuw`)
        )
    }
}
