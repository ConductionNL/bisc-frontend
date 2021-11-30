import { Organization } from 'api/types/types'
import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersDetailReadView from './CoworkersDetailReadView'
import CoworkersDetailUpdateView from './CoworkersDetailUpdateView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
}

export const CoworkersDetailView: React.FunctionComponent<Props> = props => {
    const { organization } = props

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.index}
                exact={true}
                render={props => <CoworkersDetailReadView organization={organization} {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.update}
                exact={true}
                render={props => <CoworkersDetailUpdateView organization={organization} {...props} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
