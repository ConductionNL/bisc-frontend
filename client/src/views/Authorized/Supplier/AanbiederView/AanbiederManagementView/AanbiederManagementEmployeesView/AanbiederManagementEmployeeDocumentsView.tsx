import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import { DocumentUploadButtonContainer } from 'components/Domain/Documents/Containers/DocumentUploadButtonContainer'
import { DocumentsList } from 'components/Domain/Documents/Lists/DocumentsList'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { AanbiederManagementEmployeesLocationStateProps } from './AanbiederManagementEmployeesView'

interface Props {
    routeState: AanbiederManagementEmployeesLocationStateProps
}

export const AanbiederManagementEmployeeDocumentsView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()

    // TODO: replace with the api call/query (using participantId prop)
    const { data, loading, error } = useMockQuery([
        {
            id: 'my id',
            fileName: 'bestand.pdf',
            createdAt: new Date().toString(),
            filePath: 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf',
        },
    ])

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={12}>
                <Column spacing={4}>
                    {renderTabs()}
                    <Row justifyContent={'flex-end'}>
                        <DocumentUploadButtonContainer />
                    </Row>
                </Column>
                {renderList()}
            </Column>
        </>
    )

    function renderTabs() {
        return (
            <AanbiederManagementEmployeeTabs
                currentTab={AanbiederManagementEmployeeTab.overview}
                routeState={routeState}
            />
        )
    }

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <DocumentsList data={data} />
    }
}
