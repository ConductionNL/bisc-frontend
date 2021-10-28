import React from 'react'
import { UserContextValue } from './types'

const defaultContextValues = {
    loading: false,
}

export const UserContext = React.createContext<UserContextValue>(defaultContextValues)
