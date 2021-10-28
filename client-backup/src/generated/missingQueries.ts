import { QueryHookOptions } from '@apollo/client'
import { UserEnvironmentEnum } from './enums'
import { CurrentUserQuery, CurrentUserQueryVariables, useCurrentUserQuery } from './graphql'

export function useMockedCurrentUserQuery(baseOptions?: QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
    const result = useCurrentUserQuery(baseOptions)

    const DEFAULT_GIVEN_NAME = 'Jan'
    const DEFAULT_ADDITIONAL_NAME = ''
    const DEFAULT_FAMILY_NAME = 'Janssen'

    /**
     * ------------- Uncomment for BISC environment user
     */
    // const DEFAULT_USER_ENVIRONMENT = UserEnvironmentEnum.Bisc
    // const DEFAULT_ORGANIZATION_ID = undefined
    // const DEFAULT_ORGANIZATION_NAME = undefined

    /**
     * ------------- Uncomment for TAALHUIS environment user
     */
    const DEFAULT_USER_ENVIRONMENT = UserEnvironmentEnum.Taalhuis
    const DEFAULT_ORGANIZATION_ID = 'f97a0759-2d75-4605-9995-fb4d3d330133'
    const DEFAULT_ORGANIZATION_NAME = 'Taalhuis ABC'

    /**
     * ------------- Uncomment for AANBIEDER environment user
     */
    // const DEFAULT_USER_ENVIRONMENT = UserEnvironmentEnum.Aanbieder
    // const DEFAULT_ORGANIZATION_ID = '211dede4-a701-46aa-aad6-db7a245e3ce6'
    // const DEFAULT_ORGANIZATION_NAME = 'Aanbieder ABC'

    // Object is readonly, so we need to copy it.
    const resultCopy = {
        ...result,
        data: result.data && {
            ...result.data,
            currentUser: result.data.currentUser && {
                ...result.data.currentUser,
                userEnvironment: result.data.currentUser.userEnvironment || DEFAULT_USER_ENVIRONMENT,
                organizationId: result.data.currentUser.organizationId || DEFAULT_ORGANIZATION_ID,
                organizationName: result.data.currentUser.organizationName || DEFAULT_ORGANIZATION_NAME,
                givenName: result.data.currentUser.givenName || DEFAULT_GIVEN_NAME,
                additionalName: result.data.currentUser.additionalName || DEFAULT_ADDITIONAL_NAME,
                familyName: result.data.currentUser.familyName || DEFAULT_FAMILY_NAME,
            },
        },
    }

    return resultCopy
}
