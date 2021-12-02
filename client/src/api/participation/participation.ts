import { MutationError, Participation } from 'api/types/types'
import { useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export type PostPutParticipationResponse = Participation

export type PostPutParticipationParams = RecursivePartial<Params>

interface Params extends Omit<Participation, 'learningResult' | 'testResults' | 'status' | 'provider'> {
    provider: string
}

export function usePostParticipation() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutParticipationResponse, MutationError, any, PostPutParticipationParams>({
        verb: 'POST',
        path: '/participations',
    })
}

export function usePutParticipation(organizationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutParticipationResponse, MutationError, any, PostPutParticipationParams>({
        verb: 'PUT',
        path: `/participations/${organizationId}`,
    })
}

export function useDeleteParticipation(organizationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/participations/${organizationId}`,
    })
}
