import React, { useContext } from 'react'
import { EventDataType } from '../Table/FilesEventsTable'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'

interface Props {
    defaultValues?: EventDataType
}

export enum StudentDossierEventEnum {
    FINAL_TALK = 'FINAL_TALK',
    REMARK = 'REMARK',
    FOLLOW_UP_TALK = 'FOLLOW_UP_TALK',
    INFO_FOR_STORYTELLING = 'INFO_FOR_STORYTELLING',
    INTAKE = 'INTAKE',
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
