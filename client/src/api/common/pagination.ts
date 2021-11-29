import { useEffect, useState } from 'react'
import { useGet, UseGetProps, UseGetReturn } from 'restful-react'

export interface PaginationProps {
    limit: number
    page: number
}

export interface PaginatedData<TResult = any> {
    page: number
    results: TResult[]
}

export interface PaginatedQueryParams {
    limit: number
    page: number
}

export interface UsePaginatedGetReturn<TData, TError, TQueryParams>
    extends UseGetReturn<TData, TError, TQueryParams & PaginatedQueryParams> {
    loadMore: (nextPage: number) => void
}

// This function wraps the useGet function, but doesn't support the overload that suggests `path` as first argument
export function usePaginatedGet<
    TData extends PaginatedData = any,
    TError = any,
    TQueryParams = {
        [key: string]: any
    },
    TPathParams = unknown
>(
    useGetProps: UseGetProps<TData, TError, TQueryParams, TPathParams>,
    paginationProps: PaginationProps
): UsePaginatedGetReturn<TData, TError, TQueryParams> {
    const [data, setData] = useState<TData>()

    const queryParams = useGetProps.queryParams || {}

    const useGetOutput = useGet({
        ...useGetProps,
        path: useGetProps.path,
        queryParams: {
            ...queryParams,
            limit: paginationProps.limit,
            page: paginationProps.page,
        },
    })

    useEffect(() => {
        if (useGetOutput.data) {
            if (useGetOutput.data.page && useGetOutput.data.page > 1) {
                // not the first page, so assume data has changed because of infinite scroll
                setData(prevData => {
                    if (!prevData) {
                        return useGetOutput.data ?? undefined
                    }

                    return {
                        ...prevData,
                        // merge results
                        results: [...(prevData?.results || []), ...(useGetOutput.data?.results || [])],
                    }
                })
            } else {
                // overwrite data
                setData(useGetOutput.data)
            }
        }
    }, [useGetOutput.data?.page])

    return {
        ...useGetOutput,
        loadMore: (nextNage: number) => {
            useGetOutput.refetch({
                queryParams: {
                    ...queryParams,
                    limit: paginationProps.limit,
                    page: nextNage,
                },
            })
        },
        data: data || null,
    }
}
