import React, { useState } from 'react'
import { EventDetailCreateFieldsets } from './Create/EventDetailCreateFieldsets'
import { EventDetailReadFields } from './Detail/EventDetailReadFields'
import { EventDetailUpdateFieldsets } from './Detail/EventDetailUpdateFieldsets'

interface Props {
    type: EventDetailTypes
    readOnly: boolean
    defaultValues: EventDetailDefaultValues
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
    const { type, readOnly, defaultValues } = props
    const [readOnlyState, setReadOnlyState] = useState(readOnly)

    if (readOnlyState) {
        return <EventDetailReadFields type={type} data={defaultValues} onClickEdit={() => setReadOnlyState(false)} />
    }

    if (defaultValues) {
        return (
            <EventDetailUpdateFieldsets
                type={type}
                defaultValues={defaultValues}
                onClickCancel={() => setReadOnlyState(true)}
            />
        )
    }

    return <EventDetailCreateFieldsets />
}
