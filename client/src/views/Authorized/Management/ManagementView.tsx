import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { MainNavigationType } from '../../../components/Core/Navigation/MainNavigation/types'
import { routes } from '../../../routes'
import ManagementCoworkerCreateView from './coworkers/ManagementCoworkerCreateView'
import ManagementCoworkerReadView from './coworkers/ManagementCoworkerReadView'
import ManagementCoworkerUpdateView from './coworkers/ManagementCoworkerUpdateView'
import ManagementDetailDataUpdateView from './ManagementDetail/ManagementDetailData/ManagementDetailDataUpdateView'
import ManagementDetailDataView from './ManagementDetail/ManagementDetailData/ManagementDetailDataView'
import { ManagementOverviewView } from './ManagementOverviewView'

interface Props {}

//TODO: Need to refactor this when backend is implemented
const accountType: MainNavigationType = MainNavigationType.taalhuis

export const ManagementView: React.FunctionComponent<Props> = () => {
    if ((accountType as MainNavigationType) === MainNavigationType.bisc) {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.management.bisc.index}
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
                path={routes.authorized.management.taalhuis.index}
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
