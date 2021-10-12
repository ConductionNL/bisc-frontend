import { User } from 'api/types/types'
import { useGet } from 'restful-react'

export interface CurrentUserParams {}

export interface CurrentUserResponse extends User {}

interface Options {
    lazy: boolean
}

export function useGetCurrentUser(options: Options) {
    return useGet<CurrentUserResponse>({
        path: '/users/me',
        lazy: options.lazy ?? false,
    })
}
