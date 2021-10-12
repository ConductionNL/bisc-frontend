import React from 'react'
import { accessTokenLocalstorageKey } from './constants'
import { OldSessionContextValue } from './types'

const defaultContextValues = {
    loading: true,
    error: undefined,
    login: () => Promise.resolve(undefined),
    logout: () => undefined,
    accessToken: localStorage.getItem(accessTokenLocalstorageKey),
    loggedOut: null,
}

export const OldSessionContext = React.createContext<OldSessionContextValue>(defaultContextValues)
