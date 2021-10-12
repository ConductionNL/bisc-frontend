import { Organization } from 'api/types/types'
import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
import { CoworkersDetailView } from './detail/CoworkersDetailView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    organization: Organization
}

export const CoworkersView: React.FunctionComponent<Props> = props => {
    const { organization } = props

    return (
        <Switch>
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                exact={true}
                render={props => <CoworkersOverviewView organization={organization} {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.create}
                exact={true}
                render={props => <CoworkersCreateView languageHouse={organization} {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().index}
                render={props => <CoworkersDetailView languageHouse={organization} {...props} />}
            />

            <Route component={NotFoundView} />
        </Switch>
    )
}
