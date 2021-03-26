import React from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { aanbiederManagementProfile, AanbiederManagementProfile } from '../../mocks'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { TableLink } from 'components/Core/Table/TableLink'
import {
    AanbiederProfileManagementTab,
    AanbiederProfileManagementTabs,
} from 'components/Domain/Aanbieder/AanbiederProfileManagement/AanbiederProfileManagementTabs'

export const AanbiederProfileManagementEmployeesOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery<AanbiederManagementProfile>(aanbiederManagementProfile)

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                <AanbiederProfileManagementTabs currentTab={AanbiederProfileManagementTab.employees} />
                {renderList()}
            </Column>
        </>
    )

    // TODO
    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        // TODO
        return (
            <TableLink
                to={{
                    pathname: supplierRoutes.profileManagement.employees.detail.overview,
                    search: '',
                    hash: '',
                    state: { participantId: 1 },
                }}
                text="link to employee detail"
            />
        )
    }
}
