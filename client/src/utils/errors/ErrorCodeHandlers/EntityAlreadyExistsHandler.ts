import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { GraphQLError } from 'graphql'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'

interface MetaData {
    entity: string
    field: string
    value: string
}
export class EntityAlreadyExistsHandler {
    public constructor(private readonly graphQLError: GraphQLError) {
        this.handleEntityAlreadyExistsError()
    }

    private handleEntityAlreadyExistsError() {
        const metaData = this.graphQLError.extensions?.exception?.response?.metaData as MetaData

        NotificationsManager.error(i18n._(t`${metaData.value} bestaat al`), i18n._(t`Vul een andere waarde in`))
    }
}
