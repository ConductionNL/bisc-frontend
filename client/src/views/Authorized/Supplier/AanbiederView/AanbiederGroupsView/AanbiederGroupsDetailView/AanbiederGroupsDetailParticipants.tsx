import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import {
    AanbiederGroupDetailTabs,
    AanbiederGroupsDetailTab,
} from 'components/Domain/Aanbieder/AanbiederGroups/Tabs/AanbiederGroupDetailTabs'
import { useGroupStudentsQuery } from 'generated/graphql'
import React from 'react'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailParticipantsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { routeState } = props

    const { data, loading, error } = useGroupStudentsQuery({
        variables: {
            groupId: routeState.groupId,
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            <Headline title={routeState.groupName} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <AanbiederGroupDetailTabs currentTab={AanbiederGroupsDetailTab.Deelnemers} routeState={routeState} />
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const headers = [i18n._(t`ACHTERNAAM`), i18n._(t`ROEPNAAM`)]

        return <Table flex={0.25} headers={headers} rows={getRows()} />
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.groupStudents.map(student => [
            <TableLink
                to={{
                    pathname: routes.authorized.supplier.participants.detail.index,
                    search: '',
                    hash: '',
                    state: { participantId: student.id },
                }}
                text={NameFormatters.formattedLastName(student.personDetails)}
            />,
            <Paragraph>{student.personDetails.givenName}</Paragraph>,
        ])
    }
}
