import { ApolloError } from '@apollo/client'
import { ContextUserType } from '../../../generated/graphql'

export interface SessionContextValue {
    loading: boolean
    error: ApolloError | undefined
    user?: User | null
}

export type User = ContextUserType

// TODO: this should be temporary
export enum UserRoleEnumType {
    coordinator = 'Coördinator',
    mentor = 'Begeleider',
    volunteer = 'Vrijwilliger',
    coworker = 'Medewerker',
}
