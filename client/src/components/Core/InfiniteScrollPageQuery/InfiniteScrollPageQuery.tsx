import { useLingui } from '@lingui/react'
import { UsePaginatedGetReturn } from 'api/common/pagination'
import { PaginatedResult } from 'api/types/types'
import ErrorBlock from '../Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../Feedback/Spinner/Spinner'
import { InfiniteScroll } from '../InfiniteScroll/InfiniteScroll'
import Center from '../Layout/Center/Center'

interface Props<TData, TError, TQueryParams> {
    queryHook: () => UsePaginatedGetReturn<PaginatedResult<TData>, TError, TQueryParams>
    children: (data: TData[], options: Options<TError>) => JSX.Element
    customErrorTitle?: string
    customErrorMessage?: string
}

interface Options<TError> {
    loading: boolean
    loadMore: (nextPage: number) => void
    error: TError | null
    refetch: () => void
}

export function InfiniteScrollPageQuery<TData, TError, TQueryParams>(props: Props<TData, TError, TQueryParams>) {
    const { queryHook, children, customErrorMessage, customErrorTitle } = props
    const { i18n } = useLingui()
    const { data, loading, error, loadMore, refetch } = queryHook()

    if (!data && loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error) {
        return (
            <ErrorBlock
                title={customErrorTitle || i18n._(`Er ging iets fout`)}
                message={customErrorMessage || i18n._(`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <InfiniteScroll
            loadMore={loadMore}
            isLoading={loading || !data}
            isLoadingMore={loading && !!data}
            totalPages={data?.pages}
        >
            {children(data?.results || [], { loading, loadMore, refetch, error })}
        </InfiniteScroll>
    )
}
