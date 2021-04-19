import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { FilesEventsContextProvider } from 'components/Domain/Files/Fieldsets/Context/FilesEventsFieldsetContextState'
import { FilesEventsDetailFormContainer } from 'components/Domain/Files/FormContainer/FilesEventsDetailFormContainer'
import { useMockQuery } from 'components/hooks/useMockQuery'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { FilesEventsMock } from './mocks/FilesEvents'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsFilesView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery(FilesEventsMock)

    return (
        <FilesEventsContextProvider>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Files} routeState={routeState} />
            {renderSection()}
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
            return <FilesEventsDetailFormContainer data={data} />
        }
    }
}
