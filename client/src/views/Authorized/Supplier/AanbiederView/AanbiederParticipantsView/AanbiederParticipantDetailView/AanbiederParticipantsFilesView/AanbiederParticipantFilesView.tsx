import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederParticipantTab,
    AanbiederParticipantTabs,
} from 'components/Domain/Aanbieder/AanbiederParticipants/Tabs/AanbiederParticipantTabs'
import { FilesEventsContextProvider } from 'components/Domain/Files/Fieldsets/Context/FilesEventsFieldsetContextState'
import { FilesEventsDetailFormContainer } from 'components/Domain/Files/FormContainer/FilesEventsDetailFormContainer'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { FilesEventsMock } from 'views/Authorized/Participants/taalhuis/Participants/Detail/Files/mocks/FilesEvents'
import { AanbiederParticipantDetailLocationStateProps } from '../AanbiederParticipantDetailView'

interface Props {
    routeState: AanbiederParticipantDetailLocationStateProps
}

export const AanbiederParticipantFilesView: React.FC<Props> = ({ routeState }) => {
    const { data, loading, error } = useMockQuery(FilesEventsMock)

    return (
        <FilesEventsContextProvider>
            <Headline title={i18n._(t`Dossier`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <AanbiederParticipantTabs routeState={routeState} currentTab={AanbiederParticipantTab.files} />
                {renderSection()}
            </Column>
        </FilesEventsContextProvider>
    )

    function renderSection() {
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

        if (data) {
            return <FilesEventsDetailFormContainer data={data} environment={'aanbieder'} />
        }
    }
}
