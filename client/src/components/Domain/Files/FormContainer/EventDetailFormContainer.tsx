import React, { useContext } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { EventTable } from '../Table/EventTable'
import { EventFieldsContext } from '../Fieldsets/Context/EventFieldsetContextState'
import { EventDetailTypes } from '../Fieldsets/EventDetailFieldView'

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
                    {
                        type: EventDetailTypes.intake,
                        id: 'ditiseenid',
                        date: 'somedate',
                        event: 'Vervolggesprek',
                        name: 'Suze Boelsma',
                        description:
                            'Praesent quis tellus ac nulla sodales lacinia. Donec tempor odio neque, at egestas sem imperdiet eu. In sed molestie ex, non efficitur dolor….',
                    },
                ]}
            />
        </>
    )
}
