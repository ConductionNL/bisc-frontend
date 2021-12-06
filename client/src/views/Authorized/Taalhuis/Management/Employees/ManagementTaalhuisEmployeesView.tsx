import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ManagementTaalhuisEmployeesDetailView } from './Detail/ManagementTaalhuisEmployeesDetailView'
import { ManagementTaalhuisEmployeesCreateView } from './ManagementTaalhuisEmployeesCreateView'
import { ManagementTaalhuisEmployeesOverviewView } from './ManagementTaalhuisEmployeesOverviewView'

interface Props {}

export const ManagementTaalhuisEmployeesView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={taalhuisRoutes.management.coworkers.index}
                exact={true}
                component={ManagementTaalhuisEmployeesOverviewView}
            />
            <Route
                path={taalhuisRoutes.management.coworkers.create}
                exact={true}
                component={ManagementTaalhuisEmployeesCreateView}
            />
            <Route
                path={taalhuisRoutes.management.coworkers.detail().index}
                exact={true}
                component={ManagementTaalhuisEmployeesDetailView}
            />
        </Switch>
    )
}
