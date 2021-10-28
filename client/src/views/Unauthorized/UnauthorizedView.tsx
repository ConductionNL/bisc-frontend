import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { OldSessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes/routes'
import { NotFoundView } from '../Generic/NotFoundView'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import LoggedOut from './LoggedOut/LoggedOut'
import LoginView from './Login/LoginView'
import ResetPassword from './ResetPassword/ResetPassword'

interface Props {}

export const UnauthorizedView: React.FunctionComponent<Props> = () => {
    // const sessionContext = useContext(SessionContext)
    // const history = useHistory()

    // useEffect(() => {
    //     if (sessionContext.accessToken) {
    //         history.replace(routes.authorized.index)
    //     }
    // }, [sessionContext.accessToken, history])

    // if (sessionContext.accessToken) {
    //     return null
    // }

    return (
        <Switch>
            <Redirect path={routes.unauthorized.index} exact={true} to={routes.unauthorized.login} />
            <Route path={routes.unauthorized.login} exact={true} component={LoginView} />
            {/* <Route path={routes.unauthorized.forgotpassword} exact={true} component={ForgotPassword} /> */}
            {/* <Route path={routes.unauthorized.resetpassword} exact={true} component={ResetPassword} /> */}
            <Route path={routes.unauthorized.loggedout} exact={true} component={LoggedOut} />
            {/* <Route path={routes.unauthorized.register} exact={true} component={PublicRegistrationView} /> */}

            <Route component={NotFoundView} />
        </Switch>
    )
}
