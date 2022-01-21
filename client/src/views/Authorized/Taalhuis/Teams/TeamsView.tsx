import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { TeamsCreateView } from './TeamsCreateView'
import { TeamsOverviewView } from './TeamsOverviewView'

export const TeamsView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route path={taalhuisRoutes.teams.overview} exact={true} component={TeamsOverviewView} />
            <Route path={taalhuisRoutes.teams.create} exact={true} component={TeamsCreateView} />
            <Redirect path={taalhuisRoutes.teams.index} to={taalhuisRoutes.teams.overview} />
        </Switch>
    )
}
