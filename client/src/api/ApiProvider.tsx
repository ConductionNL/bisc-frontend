import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { FunctionComponent, useContext } from 'react'
import { RestfulProvider, RestfulReactProviderProps } from 'restful-react'

export const ApiProvider: FunctionComponent = props => {
    const context = useContext(SessionContext)

    const base = process.env.REACT_APP_API_ENDPOINT!
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
