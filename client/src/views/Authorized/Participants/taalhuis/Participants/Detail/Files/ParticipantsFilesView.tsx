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
import { EventDetailTypes } from 'components/Domain/Files/Fieldsets/EventDetailFieldView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsFilesView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()

    return (
        <FilesEventsContextProvider>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Files} routeState={routeState} />
            <FilesEventsDetailFormContainer
                data={[
                    {
                        type: EventDetailTypes.intake,
                        id: 'test',
                        date: '01/03/2021',
                        name: 'Suze Boelsma',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.followUp,
                        id: 'testtest',
                        date: '01/03/2021',
                        name: 'Brian Bawuah',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.storyTelling,
                        id: 'ditistesttesteenid',
                        date: '01/03/2021',
                        name: 'Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.finalInterview,
                        id: 'testtesttesttesttesttest',
                        date: '01/03/2021',
                        name: 'Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.comment,
                        id: 'testtesttesttesttesttesttesttest',
                        date: '01/03/2021',
                        name: 'Kriss',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditijfnvfseenid',
                        date: '01/03/2021',
                        name: 'Jip',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditfdvdvdfviseenid',
                        date: '01/03/2021',
                        name: 'Janneke Test',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditisevdfdfvenid',
                        date: '01/03/2021',
                        name: 'Janneke ereest',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                ]}
            />
        </FilesEventsContextProvider>
    )
}
