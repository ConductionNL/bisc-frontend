import { FetchResult } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useState } from 'react'

type ResultFetched<T> = FetchResult<T, Record<string, any>, Record<string, any>>
type Result<T, V> = [
    mutate: (variables: V) => Promise<ResultFetched<T>> | null,
    values: {
        error: GraphQLError | null
        data: ResultFetched<T> | null
    }
]
export function useMockMutation<T, V>(fakeData: T, shouldError?: boolean, errorData?: any): Result<T, V> {
    const [error, setError] = useState<GraphQLError | null>(null)
    const [data, setData] = useState<ResultFetched<T> | null>(null)
    const mutate = () =>
        new Promise<ResultFetched<T>>(resolve => {
            setTimeout(() => {
                setError(shouldError ? new GraphQLError('error') : null)
                setData(!shouldError ? fakeData : errorData)
                resolve(fakeData)
            }, 1000)
        })
    return [mutate, { error, data }]
}
