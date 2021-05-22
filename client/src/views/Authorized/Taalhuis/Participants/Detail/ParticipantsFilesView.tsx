import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { FilesEventsContextProvider } from 'components/Domain/Files/Fieldsets/Context/FilesEventsFieldsetContextState'
import { FilesEventsDetailFormContainer } from 'components/Domain/Files/FormContainer/FilesEventsDetailFormContainer'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { StudentDossierEvent, useStudentDossierEventsQuery } from 'generated/graphql'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'

export const ParticipantsFilesView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const { data, loading, error } = useStudentDossierEventsQuery({ variables: { studentId: taalhuisParticipantId } })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.studentDossierEvents?.edges) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <FilesEventsContextProvider>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantDetailTabs activeTabId={Tabs.Files} />
            <FilesEventsDetailFormContainer data={data.studentDossierEvents.edges as StudentDossierEvent[]} />
        </FilesEventsContextProvider>
    )
}
