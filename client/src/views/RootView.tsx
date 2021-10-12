import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'
// import { AuthorizedView } from './Authorized/AuthorizedView'
// import { UserProvider } from 'components/Providers/UserProvider/UserProvider'
// import { SessionContext } from 'components/Providers/SessionProvider/context'

export const RootView: React.FunctionComponent = props => {
    // const sessionContext = useContext(SessionContext)

    return (
        // <UserProvider>
        <Switch>
            {/* {!sessionContext.accessToken && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.unauthorized.login} />
                )} */}
            <Redirect path={routes.authorized.index} exact={true} to={routes.unauthorized.login} />
            <Route path={routes.unauthorized.index} component={UnauthorizedView} />
            {/* <Route path={routes.authorized.index} component={AuthorizedView} /> */}
        </Switch>
        // </UserProvider>
    )
}

export default RootView
