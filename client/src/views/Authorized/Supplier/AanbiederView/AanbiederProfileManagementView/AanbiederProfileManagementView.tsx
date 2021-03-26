import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederProfileManagementOverviewView } from './AanbiederProfileManagementOverviewView'

export const AanbiederProfileManagementView: React.FunctionComponent = () => {
    const { profileManagement } = supplierRoutes

    return (
        <Switch>
            <Redirect path={profileManagement.index} exact={true} to={profileManagement.overview} />
            <Route path={profileManagement.overview} component={AanbiederProfileManagementOverviewView} />
        </Switch>
    )
}
