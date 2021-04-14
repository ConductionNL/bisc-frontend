import React, { useContext } from 'react'
import { EventFieldsContext, EventsContextProvider } from './Context/EventFieldsetContextState'
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

export const EventDetailFieldManager: React.FC<Props> = props => {
    const { type, defaultValues } = props
    const { createView, readOnly, showReadOnly } = useContext(EventFieldsContext)

    if (createView) {
        return <EventDetailCreateFieldsets />
    }

    if (readOnly && defaultValues) {
        return (
            <EventsContextProvider>
                <EventDetailReadFields type={type} data={defaultValues} onClickEdit={() => showReadOnly(false)} />
            </EventsContextProvider>
        )
    }

    if (defaultValues) {
        return (
            <EventsContextProvider>
                <EventDetailUpdateFieldsets
                    type={type}
                    defaultValues={defaultValues}
                    onClickCancel={() => showReadOnly(true)}
                />
            </EventsContextProvider>
        )
    }

    return null
}
