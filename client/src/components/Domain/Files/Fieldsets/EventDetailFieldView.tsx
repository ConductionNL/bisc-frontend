import React, { useContext } from 'react'
import { EventDataType } from '../Table/FilesEventsTable'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'

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
            return <FilesEventsCreateForm onClickCancel={() => showCreateView(false)} />
        }

        if (readOnly && defaultValues) {
            return <FilesEventsDetailReadFields data={defaultValues} />
        }

        if (defaultValues && !readOnly) {
            return (
                <FilesEventsDetailUpdateForm defaultValues={defaultValues} onClickCancel={() => showReadOnly(true)} />
            )
        }

        return null
    }
}
