import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisEmployeesQuery } from 'generated/graphql'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../../components/Core/Layout/Center/Center'
import { Table } from '../../../../../components/Core/Table/Table'
import { routes } from '../../../../../routes/routes'

interface Props {
    queryResponse?: TaalhuisEmployeesQuery
    loading: boolean
    error: boolean
}

export const ManagementCoworkersList: React.FunctionComponent<Props> = props => {
    const { queryResponse, loading, error } = props

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

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
