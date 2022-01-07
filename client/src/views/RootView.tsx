import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../routes/routes'
import { UnauthorizedView } from './Unauthorized/UnauthorizedView'
import { AuthorizedView } from './Authorized/AuthorizedView'
import { UserProvider } from 'components/Providers/UserProvider/UserProvider'
import { PublicRegistrationView } from './Unauthorized/Registration/PublicRegistrationView'
import { ApiProvider } from 'api/ApiProvider'

export const RootView: React.FunctionComponent = () => {
    const sessionContext = useContext(SessionContext)

    return (
        <Switch>
            {!sessionContext.session && (
                <Redirect path={routes.authorized.index} exact={true} to={routes.unauthorized.login} />
            )}

            <Route
                path={routes.public.publicRegistration}
                render={viewProps => (
                    <ApiProvider>
                        <PublicRegistrationView {...viewProps} />
                    </ApiProvider>
                )}
            />

            <Route
                path={routes.unauthorized.index}
                render={viewProps => (
                    <ApiProvider>
                        <UnauthorizedView {...viewProps} />
                    </ApiProvider>
                )}
            />

            <Route
                path={routes.authorized.index}
                render={viewProps => (
                    <ApiProvider includeAuthorizationHeader={true}>
                        <UserProvider>
                            <AuthorizedView {...viewProps} />
                        </UserProvider>
                    </ApiProvider>
                )}
            />
        </Switch>
    )
}

export default RootView
