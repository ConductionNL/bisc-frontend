import React, { useContext } from 'react'
import { StudentDossierEventType } from 'generated/graphql'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'
import { FilesEventsSuccesView } from './Success/FilesEventsSuccessView'

interface Props {
    defaultValues?: StudentDossierEventType
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { defaultValues } = props
    const {
        createView,
        readOnly,
        showReadOnly,
        showCreateView,
        successView,
        showSuccessView,
        showDeleteModal,
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
