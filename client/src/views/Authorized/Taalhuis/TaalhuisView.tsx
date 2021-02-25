import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import TaalhuisCoworkersOverviewCreateView from './Overview/TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewCreateView'
import TaalhuisCoworkersOverviewReadView from './Overview/TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewReadView'
import TaalhuisCoworkersOverviewUpdateView from './Overview/TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewUpdateView'
import { CoworkersView } from './Overview/TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersView'
import { TaalhuisOverviewView } from './TaalhuisOverviewView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.taalhuis.index} exact={true} to={routes.authorized.taalhuis.overview} />
            <Route path={routes.authorized.taalhuis.overview} component={TaalhuisOverviewView} />
            <Route path={routes.authorized.taalhuis.coworkers.create} component={TaalhuisCoworkersOverviewCreateView} />
            <Route path={routes.authorized.taalhuis.coworkers.read()} component={TaalhuisCoworkersOverviewReadView} />
            <Route
                path={routes.authorized.taalhuis.coworkers.update()}
                component={TaalhuisCoworkersOverviewUpdateView}
            />
        </Switch>
    )
}
