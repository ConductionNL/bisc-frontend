import React from 'react'
import { UserContextValue } from './types'

const defaultContextValues = {
    loading: true,
    error: undefined,
    user: null,
    changeEnvironment: () => undefined,
}

export const UserContext = React.createContext<UserContextValue>(defaultContextValues)
