import React, { createContext, useState } from 'react'
import { EventDetailDefaultValues } from '../EventDetailFieldset'

interface EventFieldsetsContextStateTypes {
    createView: boolean
    readOnly: boolean
    defaultValues?: EventDetailDefaultValues
    showCreateView: (value: boolean) => void
    showReadOnly: (value: boolean) => void
}

const ContextDefaultValues: EventFieldsetsContextStateTypes = {
    createView: false,
    readOnly: true,
    showCreateView: () => {},
    showReadOnly: () => {},
}

export const EventFieldsContext = createContext<EventFieldsetsContextStateTypes>(ContextDefaultValues)

export const EventsContextProvider: React.FC = ({ children }) => {
    const [createView, setCreateView] = useState<boolean>(ContextDefaultValues.createView)
    const [readOnly, setReadOnly] = useState<boolean>(ContextDefaultValues.readOnly)

    const showCreateView = (value: boolean) => setCreateView(value)
    const showReadOnly = (value: boolean) => setReadOnly(value)

    return (
        <EventFieldsContext.Provider
            value={{
                createView,
                readOnly,
                showCreateView,
                showReadOnly,
            }}
        >
            {children}
        </EventFieldsContext.Provider>
    )
}
