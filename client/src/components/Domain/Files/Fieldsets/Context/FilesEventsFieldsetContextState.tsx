import React, { createContext, useState } from 'react'
import { StudentDossierEventEnum } from 'generated/graphql'
interface EventFieldsetsContextStateTypes {
    createView: boolean
    readOnly: boolean
    successView: boolean
    environment: FilesEventEnvironment
    defaultValues?: StudentDossierEventEnum
    showSuccessView: (value: boolean) => void
    showEnvironmentView: (value: FilesEventEnvironment) => void
    showCreateView: (value: boolean) => void
    showReadOnly: (value: boolean) => void
}

const ContextDefaultValues: EventFieldsetsContextStateTypes = {
    createView: false,
    readOnly: true,
    environment: 'taalhuis',
    successView: false,
    showSuccessView: () => {},
    showEnvironmentView: () => {},
    showCreateView: () => {},
    showReadOnly: () => {},
}

export type FilesEventEnvironment = 'taalhuis' | 'aanbieder'

export const FilesEventsFieldsetContextState = createContext<EventFieldsetsContextStateTypes>(ContextDefaultValues)

export const FilesEventsContextProvider: React.FC = ({ children }) => {
    const [createView, setCreateView] = useState<boolean>(ContextDefaultValues.createView)
    const [readOnly, setReadOnly] = useState<boolean>(ContextDefaultValues.readOnly)
    const [environment, setEnvironment] = useState<FilesEventEnvironment>('taalhuis')
    const [successView, setSuccessView] = useState<boolean>(false)

    const showCreateView = (value: boolean) => setCreateView(value)
    const showReadOnly = (value: boolean) => setReadOnly(value)
    const showEnvironmentView = (value: FilesEventEnvironment) => setEnvironment(value)
    const showSuccessView = (value: boolean) => setSuccessView(value)

    return (
        <FilesEventsFieldsetContextState.Provider
            value={{
                createView,
                readOnly,
                successView,
                environment,
                showEnvironmentView,
                showCreateView,
                showReadOnly,
                showSuccessView,
            }}
        >
            {children}
        </FilesEventsFieldsetContextState.Provider>
    )
}
