import { useApolloClient } from '@apollo/client'
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

const defaultSession = getSessionFromLocalStorage()

export const SessionContext = createContext<SessionContextValue>({
    session: defaultSession,
})

export const SessionProvider: FunctionComponent<Props> = props => {
    const { children } = props

    const [sessionState, setSessionState] = useState<Session | undefined>(defaultSession)

    const setSession = useCallback(
        (session: Session) => {
            localStorage.setItem('TOP_session_user_id', session.userId)
            localStorage.setItem('TOP_session_user_token', session.jwtToken)
            setSessionState(session)
        },
        [setSessionState]
    )

    const removeSession = useCallback(() => {
        localStorage.removeItem('TOP_session_user_id')
        localStorage.removeItem('TOP_session_user_token')
        setSessionState(undefined)
    }, [setSessionState])

    return (
        <SessionContext.Provider
            value={{
                session: sessionState,
                setSession: setSession,
                removeSession: removeSession,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}

function getSessionFromLocalStorage(): Session | undefined {
    const userId = localStorage.getItem('TOP_session_user_id')
    const jwtToken = localStorage.getItem('TOP_session_user_token')

    if (userId && jwtToken) {
        return {
            userId,
            jwtToken,
        }
    }

    return undefined
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
