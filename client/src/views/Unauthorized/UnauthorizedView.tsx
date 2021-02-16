import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../routes'
import { NotFoundView } from '../Generic/NotFoundView'
import Kitchensink from './Dev/Kitchensink'
import { LinguiExample } from './Dev/LinguiExample'
import LoginView from './Login/LoginView'

interface Props {}

export const UnauthorizedView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.unauthorized.index} to={routes.unauthorized.kitchensink} />
            <Route path={routes.unauthorized.login} exact={true} component={LoginView} />
            <Route component={NotFoundView} />

            {/* dev only */}
            <Route path={routes.unauthorized.translationsExample} exact={true} component={LinguiExample} />
            <Route path={routes.unauthorized.kitchensink} exact={true} component={Kitchensink} />
        </Switch>
    )
}
