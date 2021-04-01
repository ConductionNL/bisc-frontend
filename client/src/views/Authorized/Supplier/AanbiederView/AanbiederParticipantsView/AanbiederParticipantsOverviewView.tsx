import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederParticipantsMock, AanbiederParticipant } from '../mocks'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'

// TODO: delete this file after 2nd sprint
export const AanbiederParticipantsOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    // TODO: remove/replace after api connection
    const { data, loading, error } = useMockQuery<AanbiederParticipant[]>(aanbiederParticipantsMock)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Deelnemers`)} />
            <Column spacing={10}>{renderList()}</Column>
        </>
    )

    function renderList() {
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

        return <Table flex={0.25} headers={[i18n._(t`ACHTERNAAM`), i18n._(t`ROEPNAAM`)]} rows={getRows()} />
    }

    function getRows() {
        if (!data) {
            return []
        }

        return data.map(item => [
            <TableLink
                to={{
                    pathname: supplierRoutes.participants.detail.overview,
                    search: '',
                    hash: '',
                    state: { participantId: item.id },
                }}
                text={item.lastName}
            />,
            <Paragraph>{item.firstName}</Paragraph>,
        ])
    }
}
