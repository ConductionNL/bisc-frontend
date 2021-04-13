import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import {
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { EventsListItem } from 'components/Domain/Files/List/EventsListItem/EventsListItem'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { routes } from 'routes/routes'
import { EventTable } from 'components/Domain/Files/Table/EventTable'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsFilesView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    const [createView, setCreateView] = useState<boolean>(false)

    return (
        <>
            <Headline
                title={i18n._(t`Dossier`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Files} routeState={routeState} />
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.add}
                    onClick={() => {
                        setCreateView(true)
                    }}
                >
                    {i18n._(t`Gebeurtenis toevoegen`)}
                </Button>
            </Row>

            <EventTable
                createView={createView}
                rows={[
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                    [
                        <Paragraph>Some date</Paragraph>,
                        <EventsListItem
                            type={'intake'}
                            data={{
                                id: 'ditiseenid',
                                title: 'Vervolggesprek',
                                name: 'Suze Boelsma',
                                description:
                                    'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                            }}
                        />,
                    ],
                ]}
            />
        </>
    )
}
