import React, { useContext } from 'react'
import { FilesEventsFieldsetContextState } from './Context/FilesEventsFieldsetContextState'
import { FilesEventsCreateForm } from './Create/FilesEventsCreateForm'
import { FilesEventsDetailReadFields } from './Detail/Read/FilesEventsDetailReadFields'
import { FilesEventsDetailUpdateForm } from './Detail/Update/FilesEventsDetailUpdateForm'
import { FilesEventsSuccesView } from './Success/FilesEventsSuccessView'
import { ContactMoment } from 'api/types/types'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { i18n } from '@lingui/core'

interface Props {
    defaultValues?: ContactMoment
}

export const EventDetailFieldView: React.FC<Props> = props => {
    const { defaultValues } = props
    const { createView, readOnly, showReadOnly, showCreateView, successView } = useContext(
        FilesEventsFieldsetContextState
    )

    return renderFields()

    function renderFields() {
        if (createView) {
            return (
                <FilesEventsCreateForm
                    onClickCancel={() => showCreateView(false)}
                    handleSuccess={() => handleMutate()}
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
                    handleSuccess={() => handleMutate()}
                    onDelete={() => handleMutate()}
                />
            )
        }

        return null
    }

    function handleMutate() {
        // showSuccessView(true)
        // showReadOnly(true)
        NotificationsManager.success(
            i18n._('Deelnemer is aangemaakt'),
            i18n._('Je wordt teruggestuurd naar het overzicht')
        )

        window.location.reload()
    }
}
