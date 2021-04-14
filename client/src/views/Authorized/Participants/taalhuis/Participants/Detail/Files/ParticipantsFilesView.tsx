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
import { EventDetailTypes } from 'components/Domain/Files/Fieldsets/EventDetailFieldView'

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
            <EventDetailFormContainer
                data={[
                    {
                        type: EventDetailTypes.intake,
                        id: 'test',
                        date: 'somedate',
                        name: 'Suze Boelsma',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.followUp,
                        id: 'testtest',
                        date: 'somedate',
                        name: 'Brian Bawuah',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.storyTelling,
                        id: 'ditistesttesteenid',
                        date: 'somedate',
                        name: 'Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.finalInterview,
                        id: 'testtesttesttesttesttest',
                        date: 'somedate',
                        name: 'Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.comment,
                        id: 'testtesttesttesttesttesttesttest',
                        date: 'somedate',
                        name: 'Mary',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditijfnvfseenid',
                        date: 'somedate',
                        name: 'Mary Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditfdvdvdfviseenid',
                        date: 'somedate',
                        name: 'Mary Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditisevdfdfvenid',
                        date: 'somedate',
                        name: 'Mary Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                ]}
            />
        </EventsContextProvider>
    )
}
