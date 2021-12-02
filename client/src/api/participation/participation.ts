import { MutationError, Participation } from 'api/types/types'
import { useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export type PostPutParticipationResponse = Participation

export type PostPutParticipationParams = RecursivePartial<Params>

interface Params
    extends Omit<Participation, 'learningNeed' | 'learningResult' | 'testResults' | 'status' | 'provider'> {
    learningNeed: string
    provider: string
}

export function usePostParticipation() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutParticipationResponse, MutationError, any, PostPutParticipationParams>({
        verb: 'POST',
        path: '/participations',
    })
}

export function usePutParticipation(participationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutParticipationResponse, MutationError, any, PostPutParticipationParams>({
        verb: 'PUT',
        path: `/participations/${participationId}`,
    })
}

export function useDeleteParticipation(participationId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/participations/${participationId}`,
    })
}
