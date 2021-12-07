import { FunctionComponent, useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import AppChrome from 'components/Chrome/AppChrome'
import { routes } from 'routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import { UserContext } from 'components/Providers/UserProvider/context'
import { TaalhuisView } from './Taalhuis/TaalhuisView'
import { SessionContext } from 'components/Providers/SessionProvider/SessionProvider'
import { OrganizationTypeEnum } from 'api/types/types'
import { BiscView } from './Bisc/BiscView'
import { ProfileDataView } from './Profile/ProfileDataView'
import { ProfileUpdateView } from './Profile/ProfileUpdateView'

interface Props {}

export const AuthorizedView: FunctionComponent<Props> = () => {
    const sessionContext = useContext(SessionContext)
    const user = useContext(UserContext).user
    const history = useHistory()

    useEffect(() => {
        if (!sessionContext.session) {
            history.replace(routes.unauthorized.loggedout)
        }
    }, [sessionContext.session, history])

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

                {user.organization.type === OrganizationTypeEnum.Taalhuis && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.taalhuis.index} />
                )}

                {user.organization.type === OrganizationTypeEnum.Taalhuis && (
                    <Redirect path={routes.authorized.index} exact={true} to={routes.authorized.supplier.index} />
                )}

                <Route path={routes.authorized.bisc.index} component={BiscView} />
                <Route path={routes.authorized.taalhuis.index} component={TaalhuisView} />
                {/* <Route path={routes.authorized.supplier.index} component={SupplierView} /> */}

                <Route path={routes.authorized.profile.index} exact={true} component={ProfileDataView} />
                <Route path={routes.authorized.profile.update} exact={true} component={ProfileUpdateView} />

                <Route component={NotFoundView} />
            </Switch>
        </AppChrome>
    )
}
