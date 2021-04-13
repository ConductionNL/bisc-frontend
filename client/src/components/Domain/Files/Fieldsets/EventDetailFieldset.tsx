import React, { useEffect, useState } from 'react'
import { EventDetailCreateFieldsets } from './Create/EventDetailCreateFieldsets'
import { EventDetailReadFields } from './Detail/EventDetailReadFields'
import { EventDetailUpdateFieldsets } from './Detail/EventDetailUpdateFieldsets'

interface Props {
    type: EventDetailTypes
    readOnly: boolean
    defaultValues: EventDetailDefaultValues | null
    createView: boolean
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
    const { type, readOnly, defaultValues, createView } = props

    const [readOnlyState, setReadOnlyState] = useState(readOnly)
    const [createViewState, setCreateViewState] = useState(false)

    useEffect(() => {
        setCreateViewState(createView)
    }, [createView])

    if (createViewState) {
        return <EventDetailCreateFieldsets onClickCancel={() => setCreateViewState(false)} />
    }

    if (readOnlyState && defaultValues) {
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

    return null
}
