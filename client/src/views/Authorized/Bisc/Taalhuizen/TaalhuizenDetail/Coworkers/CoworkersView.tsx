import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import CoworkersDetailView from 'views/Authorized/Supplier/BiscView/SupplierDetailView/Coworkers/CoworkerDetail/CoworkerDetailView'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'
import CoworkersCreateView from './CoworkersCreateView'

import CoworkersOverviewView from './CoworkersOverviewView'
import CoworkersDetailUpdateView from './detail/CoworkersDetailUpdateView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

export const CoworkersView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as TaalhuizenDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.index}
                exact={true}
                to={{
                    pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.overview,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.overview}
                exact={true}
                render={() => <CoworkersOverviewView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.create}
                exact={true}
                render={() => <CoworkersCreateView routeState={routeState} />}
            />

            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.data}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.data}
                exact={true}
                component={CoworkersDetailView}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.update}
                exact={true}
                component={CoworkersDetailUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
