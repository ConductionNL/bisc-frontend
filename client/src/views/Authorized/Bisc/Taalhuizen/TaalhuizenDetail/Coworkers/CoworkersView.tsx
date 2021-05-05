import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
// import { CoworkersDetailView } from './detail/CoworkersDetailView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
}

export const CoworkersView: React.FunctionComponent<Props> = (props) => {
    // const { languageHouseId } = props.match.params

    return (
        <Switch>
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                exact={true}
                component={CoworkersOverviewView}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.create}
                exact={true}
                component={CoworkersCreateView}
            />

            {/* <Route
                path={routes.authorized.bisc.taalhuizen.detail.coworkers.detail.index}
                component={CoworkersDetailView}
            /> */}

            <Route component={NotFoundView} />
        </Switch>
    )
}
