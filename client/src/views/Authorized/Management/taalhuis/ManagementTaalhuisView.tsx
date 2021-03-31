import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import CoworkerCreateView from './Coworkers/CoworkerCreateView'
import { CoworkerOverviewView } from './Coworkers/CoworkerOverviewView'
import { CoworkersDetailView } from './Coworkers/Detail/CoworkersDetailView'
import DataUpdateView from './Data/DataUpdateView'
import DataView from './Data/DataView'

interface Props {}

export const ManagementTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.taalhuis.data.read}
            />
            <Redirect
                path={routes.authorized.management.taalhuis.index}
                exact={true}
                to={routes.authorized.management.taalhuis.data.read}
            />

            {/* data */}
            <Redirect
                path={routes.authorized.management.taalhuis.data.index}
                exact={true}
                to={routes.authorized.management.taalhuis.data.read}
            />
            <Route path={routes.authorized.management.taalhuis.data.update} component={DataUpdateView} />
            <Route path={routes.authorized.management.taalhuis.data.read} component={DataView} />

            {/* coworkers */}
            <Redirect
                path={routes.authorized.management.taalhuis.coworkers.index}
                exact={true}
                to={routes.authorized.management.taalhuis.coworkers.overview}
            />
            <Route path={routes.authorized.management.taalhuis.coworkers.overview} component={CoworkerOverviewView} />
            <Route path={routes.authorized.management.taalhuis.coworkers.create} component={CoworkerCreateView} />

            {/* coworkers detail */}
            <Route
                path={routes.authorized.management.taalhuis.coworkers.detail.index}
                component={CoworkersDetailView}
            />
        </Switch>
    )
}
