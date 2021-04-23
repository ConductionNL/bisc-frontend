import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { routes } from '../../../../routes/routes'
import CoworkerCreateView from './Coworkers/CoworkerCreateView'
import { CoworkerOverviewView } from './Coworkers/CoworkerOverviewView'
import CoworkersDetailView from './Coworkers/Detail/CoworkerDetailView'

interface Props {}

export const ManagementBiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.bisc.index}
            />
            <Redirect
                path={routes.authorized.management.bisc.index}
                exact={true}
                to={routes.authorized.management.bisc.coworkers.index}
            />
            <Redirect
                path={routes.authorized.management.bisc.coworkers.index}
                exact={true}
                to={routes.authorized.management.bisc.coworkers.overview}
            />
            <Route
                path={routes.authorized.management.bisc.coworkers.overview}
                exact={true}
                component={CoworkerOverviewView}
            />
            <Route
                path={routes.authorized.management.bisc.coworkers.create}
                exact={true}
                component={CoworkerCreateView}
            />
            <Route path={routes.authorized.management.bisc.coworkers.detail.index} component={CoworkersDetailView} />
        </Switch>
    )
}
