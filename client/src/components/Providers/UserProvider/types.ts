import { ApolloError } from '@apollo/client'
import { UserEnvironmentEnum } from 'generated/enums'
import { User as GeneratedUser } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
}

export type User = GeneratedUser & { userEnvironment: UserEnvironmentEnum }
