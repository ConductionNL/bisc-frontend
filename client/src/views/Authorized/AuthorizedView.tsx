import React, { useCallback, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from 'components/Chrome/AppChrome'
import { SessionContext } from 'components/Providers/SessionProvider/context'
import { UserProvider } from 'components/Providers/UserProvider/UserProvider'
import { routes } from 'routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import { BiscView } from './Bisc/BiscView'
import { UserContext } from 'components/Providers/UserProvider/context'
// import { UserEnvironmentEnum } from 'generated/enums'
import { TaalhuisView } from './Taalhuis/TaalhuisView'
import { UserEnvironmentEnum } from 'generated/enums'
// import Kitchensink from './Dev/Kitchensink'
// import { LinguiExample } from './Dev/LinguiExample'
// import { ParticipantsView } from './Participants/ParticipantsView'
// import ProfileView from './Profile/ProfileView'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    const user = useContext(UserContext).user
    const history = useHistory()

    const handleLocation = useCallback(() => {
        if (!sessionContext.accessToken && !sessionContext.loggedOut) {
            history.replace(routes.unauthorized.login)
        }
        if (!sessionContext.accessToken && sessionContext.loggedOut) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [sessionContext.loggedOut, sessionContext.accessToken, history])

    const handleError = useCallback(() => {
        if (sessionContext.error) {
            history.push(routes.unauthorized.login)
        }
    }, [sessionContext.error, history])

    useEffect(() => {
        handleLocation()
    }, [sessionContext.accessToken, handleLocation])

    useEffect(() => {
        handleError()
    }, [sessionContext.error, handleError])

    if (!sessionContext.accessToken) {
        return null
    }

    return (
        <UserProvider>
            <AppChrome>
                <Switch>
                    {user && (
                        <>
                            {user.userEnvironment === UserEnvironmentEnum.Bisc && (
                                <Redirect
                                    path={routes.authorized.index}
                                    exact={true}
                                    to={routes.authorized.bisc.index}
                                />
                            )}

                            {user.userEnvironment === UserEnvironmentEnum.Taalhuis && (
                                <Redirect
                                    path={routes.authorized.index}
                                    exact={true}
                                    to={routes.authorized.taalhuis.index}
                                />
                            )}

                            {user.userEnvironment === UserEnvironmentEnum.Aanbieder && (
                                <Redirect
                                    path={routes.authorized.index}
                                    exact={true}
                                    to={routes.authorized.supplier.index}
                                />
                            )}
                        </>
                    )}

                    {/* <Route path={routes.authorized.profile} exact={true} component={ProfileView} /> */}
                    <Route path={routes.authorized.bisc.index} component={BiscView} />
                    <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} />
                    {/* <Route path={routes.authorized.supplier.index} component={SupplierView} /> */}

                    {/* <Route path={routes.authorized.participants.index} component={ParticipantsView} /> */}
                    {/* <Route path={routes.authorized.management.index} component={ManagementView} /> */}

                    <Route component={NotFoundView} />
                </Switch>
            </AppChrome>
        </UserProvider>
    )
}
