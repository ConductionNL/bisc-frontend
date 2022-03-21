import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { FunctionComponent, useContext } from 'react'
import { RestfulProvider, RestfulReactProviderProps } from 'restful-react'
import { env } from 'env'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'

interface Props {
    includeAuthorizationHeader?: boolean
}

export const ApiProvider: FunctionComponent<Props> = props => {
    const context = useContext(SessionContext)
    const history = useHistory()

    const base = env.apiUrl
    const headers = new Headers()
    headers.append('Accept', 'application/json')

    if (props.includeAuthorizationHeader && context.session) {
        headers.append('Authorization', `Bearer ${context.session.jwtToken}`)
    }

    const requestOptions: RestfulReactProviderProps['requestOptions'] = {
        headers,
    }

    return (
        <RestfulProvider base={base} requestOptions={requestOptions} onError={onRequestError}>
            {props.children}
        </RestfulProvider>
    )

    function onRequestError(error: { message: string; data: any; status?: number }) {
        if (error.status && error.status === 403) {
            // redirect to logged out screen
            history.push(routes.unauthorized.loggedout)
        }
    }
}
