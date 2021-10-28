import { useMutate } from 'restful-react'

export interface LoginParams {
    username: string
    password: string
}

export interface LoginResponse {
    id: string
    organization: string
    username: string
    locale: string
    roles: string[]
    jwtToken: string
    csrfToken: string
    name: string
}

export function usePostLogin() {
    return useMutate<LoginResponse, any, any, LoginParams>({
        verb: 'POST',
        path: '/users/login',
    })
}
