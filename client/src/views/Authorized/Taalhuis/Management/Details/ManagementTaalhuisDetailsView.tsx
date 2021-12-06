import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ManagementTaalhuisDetailsDataView } from './ManagementTaalhuisDetailsDataView'
import { ManagementTaalhuisDetailsUpdateView } from './ManagementTaalhuisDetailsUpdateView'

interface Props {}

export const ManagementTaalhuisDetailsView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.management.taalhuisDetails.index}
                exact={true}
                to={taalhuisRoutes.management.taalhuisDetails.data.index}
            />

            <Route
                path={taalhuisRoutes.management.taalhuisDetails.data.index}
                exact={true}
                component={ManagementTaalhuisDetailsDataView}
            />
            <Route
                path={taalhuisRoutes.management.taalhuisDetails.data.update}
                exact={true}
                component={ManagementTaalhuisDetailsUpdateView}
            />
        </Switch>
    )
}
