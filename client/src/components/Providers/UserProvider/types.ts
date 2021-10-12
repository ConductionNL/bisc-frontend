import { CurrentUserResponse } from 'api/authentication/currentUser'

export interface UserContextValue {
    loading: boolean
    user?: CurrentUserResponse
    setUser?: (user: CurrentUserResponse) => void
}
