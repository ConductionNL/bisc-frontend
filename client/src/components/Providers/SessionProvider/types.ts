import { ApolloError, FetchResult } from '@apollo/client'
import { LoginUserMutation, LoginUserMutationVariables } from '../../../generated/graphql'

export interface OldSessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    login?: (
        variables: LoginUserMutationVariables
    ) => Promise<FetchResult<LoginUserMutation, Record<string, any>, Record<string, any>> | undefined>
    logout: () => void
    loggedOut: null | boolean
    accessToken: string | null
}
