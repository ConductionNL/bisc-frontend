import { ApolloError } from '@apollo/client'
import { ContextUserType, UserEnvironmentEnum } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
}
export type User = ContextUserType
