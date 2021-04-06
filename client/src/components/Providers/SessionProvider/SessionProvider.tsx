import { useApolloClient } from '@apollo/client'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { LoginMutationVariables, useLoginMutation } from '../../../generated/graphql'
import { accessTokenLocalstorageKey } from './constants'
import { SessionContext } from './context'

interface Props {}

export const SessionProvider: FunctionComponent<Props> = props => {
    const client = useApolloClient()
    const { children } = props
    const [login, { loading, error, data }] = useLoginMutation()
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(accessTokenLocalstorageKey))
    const [loggedOut, setLoggedOut] = useState<boolean | null>(null)
    const handleLogin = async (variables: LoginMutationVariables) => {
        try {
            const response = await login({ variables })

            if (response.errors?.length) {
                throw new Error(response.errors[0].message)
            }
            setLoggedOut(false)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem(accessTokenLocalstorageKey)
        client.clearStore()
        setLoggedOut(true)
        setAccessToken(null)
    }

    // updates localstorage when data has been fetched
    useEffect(() => {
        const accessToken = data?.login.accessToken
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
