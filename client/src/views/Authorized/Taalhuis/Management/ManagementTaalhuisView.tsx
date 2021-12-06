import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ManagementTaalhuisDetailsView } from './Details/ManagementTaalhuisDetailsView'
import { ManagementTaalhuisEmployeesView } from './Employees/ManagementTaalhuisEmployeesView'

interface Props {}

export const ManagementTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.management.index}
                exact={true}
                to={taalhuisRoutes.management.taalhuisDetails.index}
            />

            <Route path={taalhuisRoutes.management.taalhuisDetails.index} component={ManagementTaalhuisDetailsView} />
            <Route path={taalhuisRoutes.management.coworkers.index} component={ManagementTaalhuisEmployeesView} />
        </Switch>
    )
}
