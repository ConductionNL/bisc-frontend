import { ApolloError } from '@apollo/client'
import { User as GeneratedUser } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
}

export enum UserEnvironmentEnum {
    Bisc = 'BISC',
    Aanbieder = 'Aanbieder',
    Taalhuis = 'Taalhuis',
}

export type User = GeneratedUser & { userEnvironment: UserEnvironmentEnum }
