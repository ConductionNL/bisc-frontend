import { useGet } from 'restful-react'

export interface GetUserResponse {
    userGroups: {
        id: string
    }[]
}

export function useLazyGetUser() {
    return useGet<GetUserResponse>({
        path: (params: any) => `/users/${params.userId}`,
        lazy: true,
    })
}
