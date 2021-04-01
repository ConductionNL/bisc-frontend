import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisEmployeesQuery } from 'generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Table } from '../../../../../components/Core/Table/Table'
import { routes } from '../../../../../routes/routes'

interface Props {
    queryResponse?: TaalhuisEmployeesQuery
}

export const ManagementCoworkersList: React.FunctionComponent<Props> = props => {
    const { queryResponse } = props

    return (
        <Table
            flex={1}
            headers={[i18n._(t`achternaam`), i18n._(t`roepnaam`), i18n._(t`aangemaakt`), i18n._(t`bewerkt`)]}
            rows={getRows()}
        />
    )

    function getRows() {
        if (!queryResponse) {
            return []
        }

        const list = queryResponse.taalhuisEmployees.map(coworker => {
            return [
                <TableLink
                    text={NameFormatters.formattedLastName({
                        additionalName: coworker.additionalName,
                        familyName: coworker.familyName,
                    })}
                    // TODO: change when routes get refactored to a non params solution
                    to={{
                        pathname: routes.authorized.management.taalhuis.coworkers.detail.index,
                        hash: '',
                        search: '',
                        state: {
                            coworkerId: coworker.id,
                            coworkerName: NameFormatters.formattedFullname({
                                givenName: coworker.givenName,
                                additionalName: coworker.additionalName,
                                familyName: coworker.familyName,
                            }),
                        },
                    }}
                />,
                <Paragraph>{coworker.givenName}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(coworker.dateCreated)}</Paragraph>,
                <Paragraph>{DateFormatters.formattedDate(coworker.dateModified)}</Paragraph>,
            ]
        })

        return list
    }
}
