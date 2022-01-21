import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { TeamDetailView } from './TeamDetailView'
import { TeamsCreateView } from './TeamsCreateView'
import { TeamsOverviewView } from './TeamsOverviewView'

export const TeamsView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route path={taalhuisRoutes.teams.overview} exact={true} component={TeamsOverviewView} />
            <Route path={taalhuisRoutes.teams.create} exact={true} component={TeamsCreateView} />
            <Route path={taalhuisRoutes.teams.detail().index} exact={true} component={TeamDetailView} />
            <Redirect path={taalhuisRoutes.teams.index} to={taalhuisRoutes.teams.overview} />
        </Switch>
    )
}
