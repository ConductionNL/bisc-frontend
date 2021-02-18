import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import LoggedOut from './LoggedOut/LoggedOut'
import LoginView from './Login/LoginView'
import ResetPassword from './ResetPassword/ResetPassword'

interface Props {}

export const UnauthorizedView: React.FunctionComponent<Props> = () => {
    const context = useContext(SessionContext)
    const history = useHistory()

    useEffect(() => {
        if (context.accesstoken) {
            history.replace(routes.authorized.index)
        }
    }, [context.accesstoken, history])

    if (context.accesstoken) {
        return null
    }

    return (
        <Switch>
            <Redirect path={routes.unauthorized.index} exact={true} to={routes.unauthorized.login} />
            <Route path={routes.unauthorized.login} exact={true} component={LoginView} />
            <Route path={routes.unauthorized.forgotpassword} exact={true} component={ForgotPassword} />
            <Route path={routes.unauthorized.setpassword} exact={true} component={ResetPassword} />
            <Route path={routes.unauthorized.loggedout} exact={true} component={LoggedOut} />

            {/* dev only */}
            <Route path={routes.unauthorized.translationsExample} exact={true} component={LinguiExample} />
            <Route path={routes.unauthorized.kitchensink} exact={true} component={Kitchensink} />
            <Route component={NotFoundView} />
        </Switch>
    )
}
