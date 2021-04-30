import React, { FunctionComponent, useCallback, useContext, useEffect } from 'react'
// import { useCurrentUserQuery } from '../../../generated/graphql'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Center from '../../Core/Layout/Center/Center'
import { SessionContext } from '../SessionProvider/context'
import { UserContext } from './context'
import { UserEnvironmentEnum } from './types'

interface Props {}

export const UserProvider: FunctionComponent<Props> = props => {
    const { children } = props
    const { accessToken } = useContext(SessionContext)
    // const { data, loading, error, refetch } = useCurrentUserQuery()

    // const refetchCallback = useCallback(async () => {
    //     await refetch()
    // }, [refetch])

    // useEffect(() => {
    //     refetchCallback()
    // }, [accessToken, refetchCallback])

    return (
        <UserContext.Provider
            value={{
                loading: false,
                error: undefined,
                user: {
                    __typename: 'User',
                    id: 'test',
                    /** The Email of this User. */
                    email: 'lifely@gmail.com',
                    /** The Username of this User */
                    username: 'username',
                    /** The Password of this User. */
                    password: 'password',
                    /** The Token for password reset */
                    token: 'token',
                    userEnvironment: UserEnvironmentEnum.Bisc,
                },
            }}
        >
            {renderContent()}
        </UserContext.Provider>
    )

    function renderContent() {
        // if (loading) {
        //     return (
        //         <Center grow={true}>
        //             <Spinner type={Animation.pageSpinner} />
        //         </Center>
        //     )
        // }
        return children
    }
}
