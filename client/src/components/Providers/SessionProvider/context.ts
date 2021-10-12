import React from 'react'
import { accessTokenLocalstorageKey } from './constants'
import { ApolloError, FetchResult } from '@apollo/client'
import { LoginUserMutation, LoginUserMutationVariables } from '../../../generated/graphql'

export interface OldSessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    login?: (
        variables: LoginUserMutationVariables
    ) => Promise<FetchResult<LoginUserMutation, Record<string, any>, Record<string, any>> | undefined>
    logout: () => void
    loggedOut: null | boolean
    accessToken: string | null
}

const oldDefaultContextValues = {
    loading: true,
    error: undefined,
    login: () => Promise.resolve(undefined),
    logout: () => undefined,
    accessToken: localStorage.getItem(accessTokenLocalstorageKey),
    loggedOut: null,
}

export const OldSessionContext = React.createContext<OldSessionContextValue>(oldDefaultContextValues)
