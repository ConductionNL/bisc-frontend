import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { TeamDetailView } from './TeamDetailView'
import { TeamCreateView } from './TeamCreateView'
import { TeamsOverviewView } from './TeamsOverviewView'
import { TeamUpdateView } from './TeamUpdateView'

export const TeamsView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route path={taalhuisRoutes.teams.overview} exact={true} component={TeamsOverviewView} />
            <Route path={taalhuisRoutes.teams.create} exact={true} component={TeamCreateView} />
            <Route path={taalhuisRoutes.teams.detail().index} exact={true} component={TeamDetailView} />
            <Route path={taalhuisRoutes.teams.detail().update} exact={true} component={TeamUpdateView} />
            <Redirect path={taalhuisRoutes.teams.index} to={taalhuisRoutes.teams.overview} />
        </Switch>
    )
}
