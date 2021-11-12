import { MutationError, Student } from 'api/types/types'
import { useMutate } from 'restful-react'

export interface PutProfileParams {
    organization: string
    userGroups: string[]
    username: string
    password: string // the new password
    currentPassword: string // the current password
}

export interface PutProfileResponse extends Student {}

export function usePutProfile() {
    return useMutate<PutProfileResponse, MutationError, any, PutProfileParams>({
        verb: 'PUT',
        path: (params: any) => `/users/${params.userId}`,
    })
}
