import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useContext } from 'react'
import { EventsListItem } from '../List/EventsListItem/EventsListItem'
import { EventTable } from '../Table/EventTable'
import { EventFieldsContext } from '../Fieldsets/Context/EventFieldsetContextState'

export const EventDetailFormContainer: React.FC = () => {
    const { showCreateView } = useContext(EventFieldsContext)
    const { i18n } = useLingui()

    return (
        <>
            <Row justifyContent="flex-end">
                <Button
                    icon={IconType.add}
                    onClick={() => {
                        showCreateView(true)
                    }}
                >
                    {i18n._(t`Gebeurtenis toevoegen`)}
                </Button>
            </Row>

            <EventTable
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
