import React, { useCallback, useContext, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from '../../components/Chrome/AppChrome'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { UserProvider } from '../../components/Providers/UserProvider/UserProvider'
import { routes } from '../../routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import { ManagementView } from './Management/ManagementView'
import { ParticipantsView } from './Participants/ParticipantsView'
import ProfileView from './Profile/ProfileView'
import { ReportsView } from './Reports/ReportsView'
import { SupplierView } from './Supplier/SupplierView'
import { TaalhuisView } from './Taalhuis/TaalhuisView'

interface Props {}

export const AuthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()

    const handleLocation = useCallback(() => {
        if (!context.accessToken && !context.loggedOut) {
            history.replace(routes.unauthorized.login)
        }
        if (!context.accessToken && context.loggedOut) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [context.loggedOut, context.accessToken, history])

    useEffect(() => {
        handleLocation()
    }, [context.accessToken, handleLocation])

    if (!context.accessToken) {
        return null
    }

    return (
        <UserProvider>
            <AppChrome>
                <Switch>
                    <Route path={routes.authorized.profile} exact={true} component={ProfileView} />

                    <Route path={routes.authorized.participants.index} component={ParticipantsView} />
                    <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} />
                    <Route path={routes.authorized.supplier.index} component={SupplierView} />
                    <Route path={routes.authorized.reports.index} component={ReportsView} />
                    <Route path={routes.authorized.management.index} component={ManagementView} />

                    {/* dev only */}
                    <Route path={routes.authorized.translationsExample} exact={true} component={LinguiExample} />
                    <Route path={routes.authorized.kitchensink} exact={true} component={Kitchensink} />
                    <Route component={NotFoundView} />
                </Switch>
            </AppChrome>
        </UserProvider>
    )
}
