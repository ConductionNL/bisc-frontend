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

export interface RequestPasswordResetParams {
    username: string
}

export interface RequestPasswordResetResponse {
    username: string
}

export function usePostLogin() {
    return useMutate<LoginResponse, any, any, LoginParams>({
        verb: 'POST',
        path: '/users/login',
    })
}

export function useRequestPasswordReset() {
    return useMutate<RequestPasswordResetResponse, any, any, RequestPasswordResetParams>({
        verb: 'POST',
        path: '/users/request_password_reset',
    })
}
