import React, { useContext } from 'react'
import { StudentDossierEventType } from 'temp/TEMPORARYgraphql'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'

interface Props {
    defaultValues?: StudentDossierEventType
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
