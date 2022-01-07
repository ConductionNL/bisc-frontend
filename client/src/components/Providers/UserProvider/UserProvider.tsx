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
    const { data, loading, error, refetch: refetchCurrentUser } = useGetCurrentUser({ lazy: true })
    const history = useHistory()

    useEffect(() => {
        if (sessionContext.session) {
            refetchCurrentUser()
        }

        if (!sessionContext.session || error) {
            // when no valid session is present
            sessionContext.removeSession?.()

            // redirect to logged out screen
            history.push(routes.unauthorized.loggedout)
        }
    }, [sessionContext.session, refetchCurrentUser, history, error])

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
        if (sessionContext.session && loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            // useEffect hook should take care of redirecting in this case
            return
        }

        return props.children
    }
}
