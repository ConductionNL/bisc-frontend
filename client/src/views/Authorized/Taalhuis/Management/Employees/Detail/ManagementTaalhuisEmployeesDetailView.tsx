import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ManagementTaalhuisEmployeesDetailDataView } from './ManagementTaalhuisEmployeesDetailDataView'
import { ManagementTaalhuisEmployeesDetailUpdateView } from './ManagementTaalhuisEmployeesDetailUpdateView'

interface Props {}

export const ManagementTaalhuisEmployeesDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.management.coworkers.detail().index}
                exact={true}
                to={taalhuisRoutes.management.coworkers.detail().data.index}
            />

            <Route
                path={taalhuisRoutes.management.coworkers.detail().data.index}
                exact={true}
                component={ManagementTaalhuisEmployeesDetailDataView}
            />
            <Route
                path={taalhuisRoutes.management.coworkers.detail().data.update}
                exact={true}
                component={ManagementTaalhuisEmployeesDetailUpdateView}
            />
        </Switch>
    )
}
