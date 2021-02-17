import React from 'react'
import { SessionContextValue } from './types'

const defaultContextValues = {
    loading: true,
    error: undefined,
    login: () => Promise.resolve(),
    logout: () => undefined,
    accesstoken: null,
}

export const SessionContext = React.createContext<SessionContextValue>(defaultContextValues)
