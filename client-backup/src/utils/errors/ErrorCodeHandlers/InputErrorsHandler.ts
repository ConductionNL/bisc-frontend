import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'

interface MetaData {
    entity: string
    field: string
    value?: string
}
export class InputErrorsHandler {
    public constructor(private readonly graphQLError: GraphQLError) {
        this.handleInputErrors()
    }

    private handleInputErrors() {
        const metaData = this.graphQLError.extensions?.exception?.response?.metaData as MetaData

        if (!metaData || !metaData.value) {
            NotificationsManager.error(
                i18n._(t`Er gaat iets fout met het opsturen van de gegevens`),
                i18n._(t`Controleer de ingevoerde gegevens`)
            )
            return
        }

        NotificationsManager.error(
            i18n._(t`${metaData.value} is geen geldige waarde`),
            i18n._(t`Vul de juiste waarde in`)
        )
    }
}
