import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { MainNavigationType } from '../../../components/Core/Navigation/MainNavigation/types'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { routes } from '../../../routes/routes'

import ManagementCoworkerCreateView from './coworkers/ManagementCoworkerCreateView'
import ManagementCoworkerReadView from './coworkers/ManagementCoworkerReadView'
import ManagementCoworkerUpdateView from './coworkers/ManagementCoworkerUpdateView'
import ManagementDetailDataUpdateView from './ManagementDetail/ManagementDetailData/ManagementDetailDataUpdateView'
import ManagementDetailDataView from './ManagementDetail/ManagementDetailData/ManagementDetailDataView'
import { ManagementOverviewView } from './ManagementOverviewView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.bisc) {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.management.index}
                    exact={true}
                    to={routes.authorized.management.bisc.overview}
                />
                <Route path={routes.authorized.management.bisc.overview} component={ManagementOverviewView} />
                <Route
                    path={routes.authorized.management.bisc.coworkers.create}
                    component={ManagementCoworkerCreateView}
                />
                <Route
                    path={routes.authorized.management.bisc.coworkers.read()}
                    component={ManagementCoworkerReadView}
                />
                <Route
                    path={routes.authorized.management.bisc.coworkers.update()}
                    component={ManagementCoworkerUpdateView}
                />
            </Switch>
        )
    }

    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.taalhuis.detail.data.index()}
            />
            <Route path={routes.authorized.management.taalhuis.overview} component={ManagementDetailDataView} />
            <Route
                path={routes.authorized.management.taalhuis.detail.data.update()}
                component={ManagementDetailDataUpdateView}
            />
        </Switch>
    )
}
