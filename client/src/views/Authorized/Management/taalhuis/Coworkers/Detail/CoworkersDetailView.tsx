import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import CoworkerReadView from './CoworkerReadView'
import CoworkerUpdateView from './CoworkerUpdateView'

interface Props {}

export interface ManagementTaalhuisLocationStateProps {
    coworkerName: string
    coworkerId: string
}

export const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as ManagementTaalhuisLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.taalhuis.coworkers.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.management.taalhuis.coworkers.detail.read,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.management.taalhuis.coworkers.detail.read}
                render={() => <CoworkerReadView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.management.taalhuis.coworkers.detail.update}
                render={() => <CoworkerUpdateView routeState={routeState} />}
            />
        </Switch>
    )
}
