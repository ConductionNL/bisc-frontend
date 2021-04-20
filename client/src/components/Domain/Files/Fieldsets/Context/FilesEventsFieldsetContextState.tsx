import React, { createContext, useState } from 'react'
import { StudentDossierEventEnum } from 'temp/TEMPORARYgraphql'
interface EventFieldsetsContextStateTypes {
    createView: boolean
    readOnly: boolean
    environment: FilesEventEnvironment
    defaultValues?: StudentDossierEventEnum
    showEnvironmentView: (value: FilesEventEnvironment) => void
    showCreateView: (value: boolean) => void
    showReadOnly: (value: boolean) => void
}

const ContextDefaultValues: EventFieldsetsContextStateTypes = {
    createView: false,
    readOnly: true,
    environment: 'taalhuis',
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

    const showCreateView = (value: boolean) => setCreateView(value)
    const showReadOnly = (value: boolean) => setReadOnly(value)
    const showEnvironmentView = (value: FilesEventEnvironment) => setEnvironment(value)

    return (
        <FilesEventsFieldsetContextState.Provider
            value={{
                createView,
                readOnly,
                environment,
                showEnvironmentView,
                showCreateView,
                showReadOnly,
            }}
        >
            {children}
        </FilesEventsFieldsetContextState.Provider>
    )
}
