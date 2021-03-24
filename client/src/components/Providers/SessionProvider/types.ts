import { ApolloError } from '@apollo/client'
import { LoginMutationVariables } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    login: (variables: LoginMutationVariables) => Promise<void>
    logout: () => void
    loggedOut: null | boolean
    accessToken: string | null
}
