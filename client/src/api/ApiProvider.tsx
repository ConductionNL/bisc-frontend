import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { FunctionComponent, useContext } from 'react'
import { RestfulProvider, RestfulReactProviderProps } from 'restful-react'
import { env } from 'env'

export const ApiProvider: FunctionComponent = props => {
    const context = useContext(SessionContext)

    const base = env.apiUrl
    const headers = new Headers()
    headers.append('Accept', 'application/json')

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
