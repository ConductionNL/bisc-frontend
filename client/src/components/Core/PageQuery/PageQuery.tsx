import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { UseGetReturn } from 'restful-react'
import ErrorBlock from '../Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../Feedback/Spinner/Spinner'
import Center from '../Layout/Center/Center'

interface Props<TData, TError, TVariables, TPathParams> {
    queryHook: PageQueryHook<TData, TError, TVariables, TPathParams>
    children: (data: TData, options: PageQueryResultOptions) => JSX.Element
    customErrorTitle?: string
    customErrorMessage?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PageQueryHook<TData, TError, TVariables, TPathParams> = () => UseGetReturn<
    TData,
    TError,
    TVariables,
    TPathParams
>

export interface PageQueryResultOptions {
    loading: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
    refetch: () => void
}

export function PageQuery<TData, TError, TVariables, TPathParams = {}>(
    props: Props<TData, TError, TVariables, TPathParams>
) {
    const { queryHook, children, customErrorMessage, customErrorTitle } = props
    const { i18n } = useLingui()
    const { data, loading, error, refetch } = queryHook()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (!data || error) {
        return (
            <ErrorBlock
                title={customErrorTitle || i18n._(t`Er ging iets fout`)}
                message={customErrorMessage || i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return children(data, { loading, error, refetch })
}
