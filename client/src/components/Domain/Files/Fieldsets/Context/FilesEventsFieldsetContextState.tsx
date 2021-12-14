import React, { createContext, useState } from 'react'
import { ContactMoment } from 'api/types/types'
interface EventFieldsetsContextStateTypes {
    createView: boolean
    readOnly: boolean
    successView: boolean
    environment: FilesEventEnvironment
    deleteModal: boolean
    defaultValues?: ContactMoment
    showSuccessView: (value: boolean) => void
    showEnvironmentView: (value: FilesEventEnvironment) => void
    showCreateView: (value: boolean) => void
    showReadOnly: (value: boolean) => void
    showDeleteModal: (value: boolean) => void
}

const ContextDefaultValues: EventFieldsetsContextStateTypes = {
    createView: false,
    readOnly: true,
    environment: 'taalhuis',
    successView: false,
    deleteModal: false,
    showSuccessView: () => {},
    showEnvironmentView: () => {},
    showCreateView: () => {},
    showReadOnly: () => {},
    showDeleteModal: () => {},
}

export type FilesEventEnvironment = 'taalhuis' | 'aanbieder'

export const FilesEventsFieldsetContextState = createContext<EventFieldsetsContextStateTypes>(ContextDefaultValues)

export const FilesEventsContextProvider: React.FC = ({ children }) => {
    const [createView, setCreateView] = useState<boolean>(ContextDefaultValues.createView)
    const [readOnly, setReadOnly] = useState<boolean>(ContextDefaultValues.readOnly)
    const [environment, setEnvironment] = useState<FilesEventEnvironment>('taalhuis')
    const [successView, setSuccessView] = useState<boolean>(false)
    const [deleteModal, setDeleteModal] = useState<boolean>(false)

    const showCreateView = (value: boolean) => setCreateView(value)
    const showReadOnly = (value: boolean) => {
        if (value) {
            setCreateView(false)
        }
        setReadOnly(value)
    }
    const showEnvironmentView = (value: FilesEventEnvironment) => setEnvironment(value)
    const showSuccessView = (value: boolean) => setSuccessView(value)
    const showDeleteModal = (value: boolean) => setDeleteModal(value)

    return (
        <FilesEventsFieldsetContextState.Provider
            value={{
                createView,
                readOnly,
                successView,
                environment,
                deleteModal,
                showEnvironmentView,
                showCreateView,
                showReadOnly,
                showSuccessView,
                showDeleteModal,
            }}
        >
            {children}
        </FilesEventsFieldsetContextState.Provider>
    )
}
