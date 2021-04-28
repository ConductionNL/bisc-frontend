import { ApolloError, FetchResult } from '@apollo/client'
import { LoginMutation, LoginMutationVariables } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    login?: (
        variables: LoginMutationVariables
    ) => Promise<FetchResult<LoginMutation, Record<string, any>, Record<string, any>> | undefined>
    logout: () => void
    loggedOut: null | boolean
    accessToken: string | null
}
