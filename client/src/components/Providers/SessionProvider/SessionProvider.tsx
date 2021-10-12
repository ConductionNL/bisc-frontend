import { useApolloClient } from '@apollo/client'
import { usePostLogin } from 'api/authentication/login'
import { createContext, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { LoginUserMutationVariables, useLoginUserMutation } from '../../../generated/graphql'
import { accessTokenLocalstorageKey } from './constants'
import { OldSessionContext } from './context'

export interface SessionContextValue {
    setSession?: (session: Session) => void
    removeSession?: () => void
    session?: Session
}

interface Session {
    jwtToken: string
    userId: string
}

const defaultContextValues: SessionContextValue = {}

export const SessionContext = createContext<SessionContextValue>(defaultContextValues)

export const SessionProvider: FunctionComponent<Props> = props => {
    const { children } = props

    const [session, setSession] = useState<Session | undefined>()

    const removeSession = useCallback(() => {
        setSession(undefined)
    }, [setSession])

    return (
        <SessionContext.Provider
            value={{
                setSession: setSession,
                session: session,
                removeSession: removeSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

interface Props {}

export const OldSessionProvider: FunctionComponent<Props> = props => {
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
        <OldSessionContext.Provider
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
        </OldSessionContext.Provider>
    )
}
