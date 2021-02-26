import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import TaalhuisCoworkersOverviewReadView from './detail/TaalhuisCoworkersOverviewReadView'
import TaalhuisCoworkersOverviewUpdateView from './detail/TaalhuisCoworkersOverviewUpdateView'

interface Props {}

export const TaalhuisCoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.read.detail.index()}
                exact={true}
                to={routes.authorized.taalhuis.read.detail.data()}
            />
            <Route
                path={routes.authorized.taalhuis.read.detail.data()}
                exact={true}
                component={TaalhuisCoworkersOverviewReadView}
            />

            <Route
                path={routes.authorized.taalhuis.read.detail.update()}
                exact={true}
                component={TaalhuisCoworkersOverviewUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
