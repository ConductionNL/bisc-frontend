import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { SessionContext } from '../../components/Providers/SessionProvider/context'
import { routes } from '../../routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import LoginView from './Login/LoginView'

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

            {/* dev only */}
            <Route path={routes.unauthorized.translationsExample} exact={true} component={LinguiExample} />
            <Route path={routes.unauthorized.kitchensink} exact={true} component={Kitchensink} />
            <Route component={NotFoundView} />
        </Switch>
    )
}
