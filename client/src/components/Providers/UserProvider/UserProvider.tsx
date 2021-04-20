import React, { FunctionComponent, useCallback, useContext, useEffect } from 'react'
import { useCurrentUserQuery, UserEnvironmentEnum, UserRoleEnum } from '../../../generated/graphql'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Center from '../../Core/Layout/Center/Center'
import { SessionContext } from '../SessionProvider/context'
import { UserContext } from './context'

interface Props {}

export const UserProvider: FunctionComponent<Props> = props => {
    const { children } = props
    const { accessToken } = useContext(SessionContext)
    const { data, loading, error, refetch } = useCurrentUserQuery()

    const refetchCallback = useCallback(async () => {
        await refetch()
    }, [refetch])

    useEffect(() => {
        refetchCallback()
    }, [accessToken, refetchCallback])

    return (
        <UserContext.Provider
            value={{
                loading: loading,
                error: error,
                user: {
                    id: 'testt ',
                    username: 'bbawuah',
                    givenName: 'Brian',
                    additionalName: '',
                    familyName: 'Bawuah',
                    userEnvironment: UserEnvironmentEnum.Aanbieder,
                    organizationId: 'test',
                    organizationName: 'test',
                    dateCreated: '01-01-2010',
                    dateModified: '02-02-2010',
                    userRoles: [
                        {
                            id: 'tesit',
                            name: UserRoleEnum.AanbiederMentor,
                        },
                    ],
                },
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
        return children
    }
}
