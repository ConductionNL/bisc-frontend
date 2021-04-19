import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederOverviewActiveView } from './AanbiederGroupsActiveView'

import { AanbiederGroupsCreate } from './AanbiederGroupsCreate'
import { AanbiederGroupsDetailView } from './AanbiederGroupsDetailView/AanbiederGroupsDetailView'
import { AanbiederOverviewFinishedView } from './AanbiederGroupsFinishedView'
import { AanbiederOverviewFutureView } from './AanbiederGroupsFutureView'

export const AanbiederGroupsView: React.FunctionComponent = () => {
    const { groups } = supplierRoutes

    return (
        <Switch>
            <Redirect path={groups.index} exact={true} to={groups.overview.index} />
            {/* overview */}
            <Redirect path={groups.overview.index} exact={true} to={groups.overview.active} />
            <Route path={groups.overview.active} exact={true} component={AanbiederOverviewActiveView} />
            <Route path={groups.overview.future} exact={true} component={AanbiederOverviewFutureView} />
            <Route path={groups.overview.finished} exact={true} component={AanbiederOverviewFinishedView} />

            <Route path={groups.create} exact={true} component={AanbiederGroupsCreate} />
            <Route path={groups.detail.index} component={AanbiederGroupsDetailView} />
        </Switch>
    )
}
