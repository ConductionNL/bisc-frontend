import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { FunctionComponent, useContext, useEffect, useState } from 'react'
import { RestfulProvider, RestfulReactProviderProps } from 'restful-react'

export function useResponseParsedAsJSON<TData = any>(response: Response | null): TData | undefined {
    const [data, setData] = useState<TData | undefined>(undefined)

    useEffect(() => {
        ;(async () => {
            if (response && !data) {
                setData(await response.json())
            }
        })()
    }, [response])

    return data
}

export const ApiProvider: FunctionComponent = props => {
    const context = useContext(SessionContext)

    const base = process.env.REACT_APP_API_ENDPOINT!
    const headers = new Headers()

    if (context.session) {
        headers.append('Authorization', `Bearer ${context.session.jwtToken}`)
    }

    const requestOptions: RestfulReactProviderProps['requestOptions'] = {
        headers,
    }

    return (
        <RestfulProvider base={base} requestOptions={requestOptions}>
            {props.children}
        </RestfulProvider>
    )
}
