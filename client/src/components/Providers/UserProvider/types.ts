import { ApolloError } from '@apollo/client'
import { UserEnvironmentEnum } from 'generated/enums'
import { User } from '../../../generated/graphql'

export interface UserContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: UserWithBetterTypings | null
}

export type UserWithBetterTypings = User & { userEnvironment: UserEnvironmentEnum }
