import React, { useContext } from 'react'
import { StudentDossierEvent } from 'generated/graphql'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'
import { FilesEventsSuccesView } from './Success/FilesEventsSuccessView'

interface Props {
    defaultValues?: StudentDossierEvent
    onDelete: () => void
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { defaultValues, onDelete } = props
    const {
        createView,
        readOnly,
        showReadOnly,
        showCreateView,
        successView,
        showSuccessView,
        // showDeleteModal,
    } = useContext(FilesEventsFieldsetContextState)

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
        showReadOnly(true)
        showSuccessView(true)
    }
}
