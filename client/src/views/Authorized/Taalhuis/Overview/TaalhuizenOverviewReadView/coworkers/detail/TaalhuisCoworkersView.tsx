import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../../routes'
import { NotFoundView } from '../../../../../../Generic/NotFoundView'
import TaalhuisCoworkersOverviewReadView from './TaalhuisCoworkersOverviewReadView'
import TaalhuisCoworkersOverviewUpdateView from './TaalhuisCoworkersOverviewUpdateView'

interface Props {}

export const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.coworkers.detail.index()}
                exact={true}
                to={routes.authorized.taalhuis.coworkers.detail.update()}
            />
            <Route
                path={routes.authorized.taalhuis.coworkers.detail.data()}
                exact={true}
                component={TaalhuisCoworkersOverviewReadView}
            />
            <Route
                path={routes.authorized.taalhuis.coworkers.detail.update()}
                exact={true}
                component={TaalhuisCoworkersOverviewUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
