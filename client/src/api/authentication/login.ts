import { MutationError } from 'api/types/types'
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

export interface ResetPasswordParams {
    username: string
    password: string
    token: string
}

export interface ResetPasswordResponse {
    username: string
}

export function usePostLogin() {
    return useMutate<LoginResponse, MutationError, any, LoginParams>({
        verb: 'POST',
        path: '/users/login',
    })
}

export function useRequestPasswordReset() {
    return useMutate<RequestPasswordResetResponse, MutationError, any, RequestPasswordResetParams>({
        verb: 'POST',
        path: '/users/request_password_reset',
    })
}

export function useResetPassword() {
    return useMutate<ResetPasswordResponse, MutationError, any, ResetPasswordParams>({
        verb: 'POST',
        path: '/users/reset_password',
    })
}
