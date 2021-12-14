import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, ContactMoment, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartialMaybe } from 'utils/objects/objects'

export type PaginatedContactMoment = PaginatedResult<ContactMoment>

export type PostPutContactMomentResponse = ContactMoment

export type PostPutContactMomentParams = RecursivePartialMaybe<Params>

interface Params extends Omit<ContactMoment, 'employee' | 'student'> {
    employee: string
    student: string
}

export function useGetContactMoments(forStudentId?: string) {
    return usePaginatedGet<PaginatedContactMoment>(
        {
            path: '/contact_moments',
            queryParams: { 'student.id': forStudentId },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetContactMoment(contactMomentId: string) {
    return useGet<ContactMoment>({
        path: `/contact_moments/${contactMomentId}`,
    })
}

export function usePostContactMoment() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutContactMomentResponse, MutationError, any, PostPutContactMomentParams>({
        verb: 'POST',
        path: '/contact_moments',
    })
}

export function usePutContactMoment(contactMomentId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutContactMomentResponse, MutationError, any, PostPutContactMomentParams>({
        verb: 'PUT',
        path: `/contact_moments/${contactMomentId}`,
    })
}

export function useDeleteContactMoment(contactMomentId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/contact_moments/${contactMomentId}`,
    })
}
