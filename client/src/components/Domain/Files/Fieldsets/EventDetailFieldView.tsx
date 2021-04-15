import React, { useContext } from 'react'
import { EventDataType } from '../Table/FilesEventsTable'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateFieldsets } from './Create/FilesEventsCreateFieldsets'
import { FilesEventsDetailReadFields } from './Detail/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateFieldsets } from './Detail/FilesEventsDetailUpdateFieldsets'

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
    const { createView, readOnly, showReadOnly, showCreateView } = useContext(FilesEventsFieldsetContextState)

    return renderFields()

    function renderFields() {
        if (createView) {
            return <FilesEventsCreateFieldsets onClickCancel={() => showCreateView(false)} />
        }

        if (readOnly && defaultValues) {
            return <FilesEventsDetailReadFields data={defaultValues} onClickEdit={() => showReadOnly(false)} />
        }

        if (defaultValues) {
            return (
                <FilesEventsDetailUpdateFieldsets
                    defaultValues={defaultValues}
                    onClickCancel={() => showReadOnly(true)}
                />
            )
        }

        return null
    }
}
