import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkerReadView from './CoworkerReadView'
import CoworkerUpdateView from './CoworkerUpdateView'

export interface ManagementBiscCoworkerDetailLocationStateProps {
    coworkerId: string
    coworkerName: string
}

const CoworkersDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const routeState = location.state as ManagementBiscCoworkerDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.bisc.coworkers.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.management.bisc.coworkers.detail.index,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.management.bisc.coworkers.detail.read}
                exact={true}
                render={() => <CoworkerReadView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.management.bisc.coworkers.detail.update}
                exact={true}
                render={() => <CoworkerUpdateView routeState={routeState} />}
            />

            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
