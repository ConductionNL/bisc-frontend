import React from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import DataView from './Data/DataView'
import { routes } from 'routes/routes'
import DataUpdateView from './Data/DataUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = (props) => {
    // const { languageHouseId } = props.match.params

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail().index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.index}
                exact={true}
                component={DataView}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.update}
                exact={true}
                component={DataUpdateView}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                component={CoworkersView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
