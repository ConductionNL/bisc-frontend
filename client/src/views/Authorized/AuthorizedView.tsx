import { FunctionComponent, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from 'components/Chrome/AppChrome'
import { routes } from 'routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import { UserContext } from 'components/Providers/UserProvider/context'
// import { TaalhuisView } from './Taalhuis/TaalhuisView'
// import { UserEnvironmentEnum } from 'generated/enums'
import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { OrganizationTypeEnum } from 'api/types/types'
import { BiscView } from './Bisc/BiscView'

interface Props {}

export const AuthorizedView: FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    const user = useContext(UserContext).user
    const history = useHistory()

    useEffect(() => {
        if (!sessionContext.session) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [sessionContext.session])

    if (!sessionContext.session) {
        return null
    }

    if (!user) {
        return <NotFoundView />
    }

    return (
        <AppChrome>
            <Switch>
                {user.organization.type === OrganizationTypeEnum.Bisc && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.bisc.index} />
                )}

                {/* {user.userEnvironment === UserEnvironmentEnum.Taalhuis && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.taalhuis.index} />
                )}

                {user.userEnvironment === UserEnvironmentEnum.Aanbieder && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.supplier.index} />
                )} */}

                {/* <Route path={routes.authorized.profile} exact={true} component={ProfileView} /> */}
                <Route path={routes.authorized.bisc.index} component={BiscView} />
                {/* <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} /> */}
                {/* <Route path={routes.authorized.supplier.index} component={SupplierView} /> */}

                {/* <Route path={routes.authorized.participants.index} component={ParticipantsView} /> */}
                {/* <Route path={routes.authorized.management.index} component={ManagementView} /> */}

                <Route component={NotFoundView} />
            </Switch>
        </AppChrome>
    )
}
