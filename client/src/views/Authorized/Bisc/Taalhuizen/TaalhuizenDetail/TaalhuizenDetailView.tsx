import React from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import DataView from './Data/DataView'
import DataUpdateView from './Data/DataUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { routes } from 'routes/routes'

interface Props {}

export interface TaalhuizenDetailLocationStateProps {
    taalhuisId: string
    taalhuisName: string
}

const TaalhuizenDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as TaalhuizenDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail.index}
                exact={true}
                to={{ pathname: routes.authorized.bisc.taalhuizen.detail.data.index, state: routeState }}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.data.index}
                exact={true}
                render={() => <DataView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.data.update}
                exact={true}
                render={() => <DataUpdateView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.index}
                render={() => <CoworkersView routeState={routeState} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
