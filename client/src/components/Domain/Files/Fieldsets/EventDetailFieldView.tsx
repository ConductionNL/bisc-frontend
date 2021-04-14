import React, { useContext } from 'react'
import { EventFieldsContext } from './Context/EventFieldsetContextState'
import { EventDetailCreateFieldsets } from './Create/EventDetailCreateFieldsets'
import { EventDetailReadFields } from './Detail/EventDetailReadFields'
import { EventDetailUpdateFieldsets } from './Detail/EventDetailUpdateFieldsets'

interface Props {
    type: EventDetailTypes
    defaultValues: EventDetailDefaultValues | null
}

export enum EventDetailTypes {
    finalInterview = 'finalInterview',
    comment = 'comment',
    followUp = 'followUp',
    storyTelling = 'storyTelling',
    intake = 'intake',
}

export interface EventDetailDefaultValues {
    name: string
    events: string
    date: string
    description: string
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { type, defaultValues } = props
    const { createView, readOnly, showReadOnly, showCreateView } = useContext(EventFieldsContext)

    return renderFields()

    function renderFields() {
        if (createView) {
            return <EventDetailCreateFieldsets onClickCancel={() => showCreateView(false)} />
        }

        if (readOnly && defaultValues) {
            return <EventDetailReadFields type={type} data={defaultValues} onClickEdit={() => showReadOnly(false)} />
        }

        if (defaultValues) {
            return (
                <EventDetailUpdateFieldsets
                    type={type}
                    defaultValues={defaultValues}
                    onClickCancel={() => showReadOnly(true)}
                />
            )
        }

        return null
    }
}
