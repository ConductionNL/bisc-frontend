import React from 'react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import { TaalhuisDetailDataView } from './Data/TaalhuisDetailDataView'
import { routes } from 'routes/routes'
import { TaalhuisDetailUpdateView } from './Data/TaalhuisDetailUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = props => {
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
                render={props => <TaalhuisDetailDataView {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.update}
                exact={true}
                render={props => <TaalhuisDetailUpdateView {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                render={props => <CoworkersView {...props} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
