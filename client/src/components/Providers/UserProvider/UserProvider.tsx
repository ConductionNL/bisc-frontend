import { useMockedCurrentUserQuery } from 'generated/missingQueries'
import React, { useContext, useEffect } from 'react'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Center from '../../Core/Layout/Center/Center'
import { SessionContext } from '../SessionProvider/context'
import { UserContext } from './context'
import { UserWithBetterTypings } from './types'

interface Props {}

export const UserProvider: React.FunctionComponent<Props> = props => {
    const { accessToken, logout } = useContext(SessionContext)
    const { data, loading, error, refetch } = useMockedCurrentUserQuery({ skip: !accessToken })

    useEffect(() => {
        if (accessToken) {
            refetch()
        }
    }, [accessToken])

    const user = data?.currentUser as UserWithBetterTypings

    return (
        <UserContext.Provider
            value={{
                loading: loading,
                error: error,
                user: user,
            }}
        >
            {renderContent()}
        </UserContext.Provider>
    )

    function renderContent() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            logout()
        }

        return props.children
    }
}
