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
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { routes } from 'routes/routes'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederEmployeeProfile, providerEmployeeProfile } from '../../mocks'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailParticipantsView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { routeState } = props

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederEmployeeProfile>(providerEmployeeProfile)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumbs */}
            <Headline spacingType={SpacingType.small} title={data?.fullName || ''} />
            <Column spacing={10}>{renderList()}</Column>
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

        return data.participants.map(({ id, lastName, firstName }) => [
            <TableLink
                to={{
                    pathname: routes.authorized.supplier.participants.detail.index,
                    search: '',
                    hash: '',
                    state: { participantId: id },
                }}
                text={lastName}
            />,
            <Paragraph>{firstName}</Paragraph>,
        ])
    }
}
