import React, { useContext } from 'react'
import { EventDataType } from '../Table/EventTable'
import { EventFieldsContext } from './Context/EventFieldsetContextState'
import { EventDetailCreateFieldsets } from './Create/EventDetailCreateFieldsets'
import { EventDetailReadFields } from './Detail/EventDetailReadFields'
import { EventDetailUpdateFieldsets } from './Detail/EventDetailUpdateFieldsets'

interface Props {
    defaultValues?: EventDataType
}

export enum EventDetailTypes {
    finalInterview = 'finalInterview',
    comment = 'comment',
    followUp = 'followUp',
    storyTelling = 'storyTelling',
    intake = 'intake',
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { defaultValues } = props
    const { createView, readOnly, showReadOnly, showCreateView } = useContext(EventFieldsContext)

    return renderFields()

    function renderFields() {
        if (createView) {
            return <EventDetailCreateFieldsets onClickCancel={() => showCreateView(false)} />
        }

        if (readOnly && defaultValues) {
            return <EventDetailReadFields data={defaultValues} onClickEdit={() => showReadOnly(false)} />
        }

        if (defaultValues) {
            return <EventDetailUpdateFieldsets defaultValues={defaultValues} onClickCancel={() => showReadOnly(true)} />
        }

        return null
    }
}
