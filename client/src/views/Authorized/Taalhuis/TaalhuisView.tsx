import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.taalhuis.index} exact={true} to={routes.authorized.taalhuis.overview} />
            <Route path={routes.authorized.taalhuis.overview} component={TaalhuisOverviewView} />
        </Switch>
    )
}
