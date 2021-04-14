import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederGroupsCreate } from './AanbiederGroupsCreate'
import { AanbiederGroupsDetailView } from './AanbiederGroupsDetailView/AanbiederGroupsDetailView'
import { AanbiederGroupsOverview } from './AanbiederGroupsOverview'

export const AanbiederGroupsView: React.FunctionComponent = () => {
    const { groups } = supplierRoutes

    return (
        <Switch>
            <Redirect path={groups.index} exact={true} to={groups.overview} />
            <Route path={groups.overview} exact={true} component={AanbiederGroupsOverview} />
            <Route path={groups.create} exact={true} component={AanbiederGroupsCreate} />
            <Route path={groups.detail.index} component={AanbiederGroupsDetailView} />
        </Switch>
    )
}
