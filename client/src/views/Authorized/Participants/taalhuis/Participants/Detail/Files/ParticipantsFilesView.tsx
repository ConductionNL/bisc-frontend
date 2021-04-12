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
import { EventDetailFieldset, EventDetailTypes } from 'components/Domain/Files/Fieldsets/EventDetailFieldset'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsFilesView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    return (
        <>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Intake} routeState={routeState} />
            <EventDetailFieldset
                type={EventDetailTypes.intake}
                readOnly={true}
                description={i18n._(
                    t`Proin imperdiet mauris eget gravida faucibus. In sed venenatis elit. 
                    Praesent viverra eleifend quam quis mattis. Duis vitae volutpat lorem, ac eleifend nunc. 
                    Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. 
                    In sed molestie ex, non efficitur dolor.`
                )}
            />
        </>
    )
}
