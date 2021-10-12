import { LanguageHouse } from 'generated/graphql'
import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
import { CoworkersDetailView } from './detail/CoworkersDetailView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    languageHouse: LanguageHouse
}

export const CoworkersView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props

    return (
        <Switch>
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                exact={true}
                render={props => <CoworkersOverviewView languageHouse={languageHouse} {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.create}
                exact={true}
                render={props => <CoworkersCreateView languageHouse={languageHouse} {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().index}
                render={props => <CoworkersDetailView languageHouse={languageHouse} {...props} />}
            />

            <Route component={NotFoundView} />
        </Switch>
    )
}
