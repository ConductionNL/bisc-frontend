import { FunctionComponent } from 'react'
import { RestfulProvider, RestfulReactProviderProps } from 'restful-react'

export const ApiProvider: FunctionComponent = props => {
    const base = process.env.REACT_APP_API_ENDPOINT!
    const requestOptions: RestfulReactProviderProps['requestOptions'] = {}

    return (
        <RestfulProvider base={base} requestOptions={requestOptions}>
            {props.children}
        </RestfulProvider>
    )
}
