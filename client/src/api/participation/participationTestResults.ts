import { LearningNeedOutcome, MutationError, TestResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartialMaybe } from 'utils/objects/objects'

export type PostPutTestResultResponse = TestResult

export type PostPutTestResultParams = RecursivePartialMaybe<Params>

interface Params extends Omit<TestResult, 'learningNeedOutCome' | 'participation'> {
    participation: string
    provider: string
    learningNeedOutCome: LearningNeedOutcome & { learningNeed: string }
}

export function useGetTestResult(testResultId: string) {
    return useGet<TestResult>({
        path: `/test_results/${testResultId}`,
    })
}

export function usePostTestResult() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutTestResultResponse, MutationError, any, PostPutTestResultParams>({
        verb: 'POST',
        path: '/test_results',
    })
}

export function usePutTestResult(testResultId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutTestResultResponse, MutationError, any, PostPutTestResultParams>({
        verb: 'PUT',
        path: `/test_results/${testResultId}`,
    })
}

export function useDeleteTestResult(testResultId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/test_results/${testResultId}`,
    })
}
