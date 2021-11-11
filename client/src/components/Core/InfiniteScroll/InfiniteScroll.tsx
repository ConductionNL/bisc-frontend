import React, { useCallback, useState } from 'react'
import { default as ReactInfiniteScroll } from 'react-infinite-scroller'

export interface Props {
    loadMore: (page: number) => void
    scrollParentRef?: React.RefObject<HTMLElement>
    useWindow?: boolean
    hasMore?: boolean
    totalPages?: number
    isLoading?: boolean
}

export const InfiniteScroll: React.FunctionComponent<Props> = props => {
    const { children, useWindow = true, scrollParentRef, totalPages, loadMore, isLoading = false } = props

    const [currentPage, setCurrentPage] = useState<number>(1)

    const handleLoadMore = useCallback(
        (newPage: number) => {
            setCurrentPage(newPage)
            loadMore(newPage)
        },
        [loadMore]
    )

    return (
        <ReactInfiniteScroll loadMore={handleLoadMore} pageStart={1} hasMore={hasMore()}>
            {children}
        </ReactInfiniteScroll>
    )

    function hasMore() {
        if (isLoading) {
            // never load more when data is already loading
            return false
        }

        if (!totalPages) {
            // if totalPages is not provided, default to true
            return true
        }

        return currentPage < totalPages
    }
}
