import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'
import { AuthorizedView } from './Authorized/AuthorizedView'
import { UserProvider } from 'components/Providers/UserProvider/UserProvider'
import { PublicRegistrationView } from './Unauthorized/Registration/PublicRegistrationView'

export const RootView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)

    return (
        <Switch>
            <Route path={routes.publicRegistration} exact={true} component={PublicRegistrationView} />

            {!sessionContext.session && (
                <Redirect path={routes.authorized.index} exact={true} to={routes.unauthorized.login} />
            )}

            <Route path={routes.unauthorized.index} component={UnauthorizedView} />

            <Route
                path={routes.authorized.index}
                render={viewProps => (
                    <UserProvider>
                        <AuthorizedView {...viewProps} />
                    </UserProvider>
                )}
            />
        </Switch>
    )
}

export default RootView
