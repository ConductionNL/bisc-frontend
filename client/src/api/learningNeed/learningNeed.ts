import { usePaginatedGet } from 'api/common/pagination'
import { LearningNeed, Maybe, MutationError, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'

export interface LeaningNeedsParams {}
export interface LearningNeedsData extends PaginatedResult<LearningNeed> {}

export function useGetLearningNeeds(studentId: string) {
    return usePaginatedGet<LearningNeedsData>(
        {
            path: `/learning_needs`,
            queryParams: {
                'student.id': studentId,
            },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetLearningNeed(learningNeedId: string) {
    return useGet<LearningNeed>({
        path: `/learning_needs/${learningNeedId}`,
    })
}

export interface PostPutLearningNeedParams {
    student: string
    description?: Maybe<string>
    motivation?: Maybe<string>
    advisedOffer?: Maybe<string>
    desiredOffer?: Maybe<string>
    offerDifference?: Maybe<string>
    // languageHouse: string
    // civicIntegration: {
    //     id?: string
    //     requirement?: Maybe<CivicIntegrationRequirement>
    //     reason?: Maybe<CivicIntegrationReason>
    //     finishDate?: Maybe<string>
    // }
}

export interface PostLearningNeedResponse extends LearningNeed {}

export function usePostLearningNeed() {
    return useMutate<PostLearningNeedResponse, MutationError, any, PostPutLearningNeedParams>({
        verb: 'POST',
        path: '/learning_needs',
    })
}

export interface PutLearningNeedResponse extends LearningNeed {}

export function usePutLearningNeed(learningNeedId: string) {
    return useMutate<PutLearningNeedResponse, MutationError, any, PostPutLearningNeedParams>({
        verb: 'PUT',
        path: `/learning_needs/${learningNeedId}`,
    })
}

export interface DeleteLearningNeedParams {}
export interface DeletelearningNeedResponse {}

export function useDeleteLearningNeed(learningNeedId: string) {
    return useMutate<DeletelearningNeedResponse, MutationError, any, DeleteLearningNeedParams>({
        verb: 'DELETE',
        path: `/learning_needs/${learningNeedId}`,
    })
}
