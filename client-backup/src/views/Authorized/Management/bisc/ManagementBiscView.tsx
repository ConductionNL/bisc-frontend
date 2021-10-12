import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { routes } from '../../../../routes/routes'
// import CoworkerCreateView from './Coworkers/CoworkerCreateView'
import { CoworkerOverviewView } from './Coworkers/CoworkerOverviewView'
// import CoworkersDetailView from './Coworkers/Detail/CoworkerDetailView'

interface Props {}

export const ManagementBiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.management.index}
                exact={true}
                to={routes.authorized.bisc.management.index}
            />
            <Redirect
                path={routes.authorized.bisc.management.index}
                exact={true}
                to={routes.authorized.bisc.management.coworkers.index}
            />
            <Route
                path={routes.authorized.bisc.management.coworkers.index}
                exact={true}
                component={CoworkerOverviewView}
            />
            {/* <Route
                path={routes.authorized.bisc.management.coworkers.create}
                exact={true}
                component={CoworkerCreateView}
            /> */}
            {/* <Route path={routes.authorized.bisc.management.coworkers.detail.index} component={CoworkersDetailView} /> */}
        </Switch>
    )
}
