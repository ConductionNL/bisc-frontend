import { useApolloClient } from '@apollo/client'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { LoginUserMutationVariables, useLoginUserMutation } from '../../../generated/graphql'
import { accessTokenLocalstorageKey } from './constants'
import { SessionContext } from './context'

interface Props {}

export const SessionProvider: FunctionComponent<Props> = props => {
    const client = useApolloClient()
    const { children } = props
    const [login, { loading, error, data }] = useLoginUserMutation()
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(accessTokenLocalstorageKey))
    const [loggedOut, setLoggedOut] = useState<boolean | null>(null)
    const handleLogin = async (variables: LoginUserMutationVariables) => {
        const response = await login({ variables })

        if (response.errors?.length || !response.data) {
            return
        }

        setLoggedOut(false)
        return response
    }

    const handleLogout = () => {
        localStorage.removeItem(accessTokenLocalstorageKey)
        client.clearStore()
        setLoggedOut(true)
        setAccessToken(null)
    }

    // updates localstorage when data has been fetched
    useEffect(() => {
        const accessToken = data?.loginUser?.user?.token
        if (!accessToken) {
            return
        }
        localStorage.setItem(accessTokenLocalstorageKey, accessToken)
        setAccessToken(accessToken)
    }, [data])

    return (
        <SessionContext.Provider
            value={{
                accessToken: accessToken,
                loading: loading,
                error: error,
                loggedOut: loggedOut,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
