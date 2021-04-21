import React, { createContext, useState } from 'react'
import { StudentDossierEventEnum } from 'temp/TEMPORARYgraphql'
interface EventFieldsetsContextStateTypes {
    createView: boolean
    readOnly: boolean
    defaultValues?: StudentDossierEventEnum
    showCreateView: (value: boolean) => void
    showReadOnly: (value: boolean) => void
}

const ContextDefaultValues: EventFieldsetsContextStateTypes = {
    createView: false,
    readOnly: true,
    showCreateView: () => {},
    showReadOnly: () => {},
}

export const FilesEventsFieldsetContextState = createContext<EventFieldsetsContextStateTypes>(ContextDefaultValues)

export const FilesEventsContextProvider: React.FC = ({ children }) => {
    const [createView, setCreateView] = useState<boolean>(ContextDefaultValues.createView)
    const [readOnly, setReadOnly] = useState<boolean>(ContextDefaultValues.readOnly)

    const showCreateView = (value: boolean) => setCreateView(value)
    const showReadOnly = (value: boolean) => setReadOnly(value)

    return (
        <FilesEventsFieldsetContextState.Provider
            value={{
                createView,
                readOnly,
                showCreateView,
                showReadOnly,
            }}
        >
            {children}
        </FilesEventsFieldsetContextState.Provider>
    )
}
