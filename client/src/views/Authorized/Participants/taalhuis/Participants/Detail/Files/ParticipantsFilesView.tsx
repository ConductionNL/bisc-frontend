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
import { EventsContextProvider } from 'components/Domain/Files/Fieldsets/Context/EventFieldsetContextState'
import { EventDetailFormContainer } from 'components/Domain/Files/FormContainer/EventDetailFormContainer'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsFilesView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()

    return (
        <EventsContextProvider>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Files} routeState={routeState} />
            <EventDetailFormContainer />
        </EventsContextProvider>
    )
}
