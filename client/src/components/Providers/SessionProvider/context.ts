import React from 'react'
import { accessTokenLocalstorageKey } from './constants'
import { SessionContextValue } from './types'

const defaultContextValues = {
    loading: true,
    error: undefined,
    login: () => Promise.resolve(),
    logout: () => undefined,
    accesstoken: localStorage.getItem(accessTokenLocalstorageKey),
}

export const SessionContext = React.createContext<SessionContextValue>(defaultContextValues)
