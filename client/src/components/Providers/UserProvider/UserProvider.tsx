import { useGetCurrentUser } from 'api/authentication/currentUser'
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Center from '../../Core/Layout/Center/Center'
import { SessionContext } from '../SessionProvider/SessionProvider'
import { UserContext } from './context'

interface Props {}

export const UserProvider: React.FunctionComponent<Props> = props => {
    const sessionContext = useContext(SessionContext)
    const { data, loading, error, refetch } = useGetCurrentUser({ lazy: true })
    const history = useHistory()

    useEffect(() => {
        if (sessionContext.session) {
            refetch()
        } else {
            redirectToLoggedOutScreen()
        }
    }, [sessionContext.session, refetch])

    const user = sessionContext.session && data ? data : undefined

    return (
        <UserContext.Provider
            value={{
                loading: loading,
                user: user,
            }}
        >
            {renderContent()}
        </UserContext.Provider>
    )

    function renderContent() {
        if (loading || !user) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            if (sessionContext.removeSession) {
                sessionContext.removeSession()
            }

            redirectToLoggedOutScreen()
        }

        return props.children
    }

    function redirectToLoggedOutScreen() {
        history.push(routes.unauthorized.loggedout)
    }
}
