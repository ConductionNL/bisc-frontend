import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import TaalhuisCoworkersOverviewCreateView from './Overview/TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewCreateView'
import { CoworkersDetailView } from './Overview/TaalhuizenOverviewReadView/coworkers/detail/TaalhuisCoworkersView'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.taalhuis.index} exact={true} to={routes.authorized.taalhuis.overview} />
            <Route path={routes.authorized.taalhuis.overview} exact={true} component={TaalhuisOverviewView} />
            <Route
                path={routes.authorized.taalhuis.coworkers.create}
                exact={true}
                component={TaalhuisCoworkersOverviewCreateView}
            />
            <Route path={routes.authorized.taalhuis.coworkers.detail.index()} component={CoworkersDetailView} />
        </Switch>
    )
}
