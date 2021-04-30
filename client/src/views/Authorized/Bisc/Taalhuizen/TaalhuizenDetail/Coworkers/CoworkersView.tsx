import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
// import { CoworkersDetailView } from './detail/CoworkersDetailView'

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

            {/* <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index}
                render={() => <CoworkersDetailView routeState={routeState} />}
            /> */}

            <Route component={NotFoundView} />
        </Switch>
    )
}
