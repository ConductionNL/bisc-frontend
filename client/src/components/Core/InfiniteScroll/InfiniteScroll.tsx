import React, { useCallback, useState } from 'react'
import { default as ReactInfiniteScroll } from 'react-infinite-scroller'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from '../Layout/Center/Center'
import styles from './InfiniteScroll.module.scss'

export interface Props {
    loadMore: (page: number) => void
    totalPages?: number
    isLoading?: boolean
    isLoadingMore?: boolean
}

export const InfiniteScroll: React.FunctionComponent<Props> = props => {
    const { children, totalPages, loadMore, isLoading = false, isLoadingMore = false } = props

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
            {isLoadingMore && (
                <Center className={styles.spinner}>
                    <br />
                    <Spinner type={Animation.simpleSpinner} />
                </Center>
            )}
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
