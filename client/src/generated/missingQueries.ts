import { UserEnvironmentEnum } from 'components/Providers/UserProvider/types'

export function useCurrentUserQuery() {
    return {
        refetch: () => undefined,
        loading: false,
        error: undefined,
        data: {
            currentUser: {
                user: {
                    id: 'test',
                    /** The Email of this User. */
                    email: 'lifely@gmail.com',
                    /** The Username of this User */
                    username: 'username',
                    /** The Password of this User. */
                    password: 'password',
                    /** The Token for password reset */
                    token: 'token',
                    userEnvironment: UserEnvironmentEnum.Taalhuis,
                    organizationId: 'f97a0759-2d75-4605-9995-fb4d3d330133',
                },
            },
        },
    }
}
