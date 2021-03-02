import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import TaalhuisCoworkerReadView from './detail/TaalhuisCoworkerReadView'
import TaalhuisCoworkersUpdateView from './detail/TaalhuisCoworkerUpdateView'
import TaalhuisCoworkersOverviewView from './TaalhuisCoworkersOverviewView'

interface Props {}

export const TaalhuisCoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.read.detail.index()}
                exact={true}
                to={routes.authorized.taalhuis.read.detail.overview()}
            />
            <Route
                path={routes.authorized.taalhuis.read.detail.overview()}
                exact={true}
                component={TaalhuisCoworkersOverviewView}
            />
            <Route
                path={routes.authorized.taalhuis.read.detail.data()}
                exact={true}
                component={TaalhuisCoworkerReadView}
            />
            <Route
                path={routes.authorized.taalhuis.read.detail.update()}
                exact={true}
                component={TaalhuisCoworkersUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
