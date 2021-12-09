import React, { useContext } from 'react'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'
import { FilesEventsSuccesView } from './Success/FilesEventsSuccessView'
import { ContactMoment } from 'api/types/types'

interface Props {
    defaultValues?: ContactMoment
    onDelete: () => void
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { defaultValues, onDelete } = props
    const { createView, readOnly, showReadOnly, showCreateView, successView, showSuccessView } = useContext(
        FilesEventsFieldsetContextState
    )

    return renderFields()

    function renderFields() {
        if (createView) {
            return (
                <FilesEventsCreateForm
                    onClickCancel={() => showCreateView(false)}
                    handleSuccess={() => handleSuccess()}
                />
            )
        }

        if (readOnly && defaultValues) {
            return (
                <>
                    <FilesEventsDetailReadFields data={defaultValues} />
                    {successView && <FilesEventsSuccesView />}
                </>
            )
        }

        if (defaultValues && !readOnly) {
            return (
                <FilesEventsDetailUpdateForm
                    defaultValues={defaultValues}
                    onClickCancel={() => showReadOnly(true)}
                    handleSuccess={() => handleSuccess()}
                    onDelete={onDelete}
                />
            )
        }

        return null
    }

    function handleSuccess() {
        showSuccessView(true)
        showReadOnly(true)
    }
}
