import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import { TaalhuizenDetailLocationStateProps } from '../../TaalhuizenDetailView'
import CoworkersDetailReadView from './CoworkersDetailReadView'
import CoworkersDetailUpdateView from './CoworkersDetailUpdateView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

export interface TaalhuizenCoworkersDetailLocationStateProps extends TaalhuizenDetailLocationStateProps {
    coworkerId: string
    coworkerName: string
}

export const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as TaalhuizenCoworkersDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.data,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.data}
                exact={true}
                render={() => <CoworkersDetailReadView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.update}
                exact={true}
                render={() => <CoworkersDetailUpdateView routeState={routeState} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
