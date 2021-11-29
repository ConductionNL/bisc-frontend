import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { UseGetReturn } from 'restful-react'
import ErrorBlock from '../Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../Feedback/Spinner/Spinner'
import Center from '../Layout/Center/Center'

interface Props<TData, TVariables, TPathParams> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryHook: () => UseGetReturn<TData, any, TVariables, TPathParams>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (data: TData, loading: boolean, error: any, refetch: () => void) => JSX.Element
    customErrorTitle?: string
    customErrorMessage?: string
}

export function PageQuery<TData, TVariables, TPathParams = {}>(props: Props<TData, TVariables, TPathParams>) {
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

    return children(data, loading, error, refetch)
}
