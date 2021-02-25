import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import TaalhuisCoworkersOverviewCreateView from './TaalhuisCoworkersOverviewCreateView'
import TaalhuisCoworkersOverviewReadView from './TaalhuisCoworkersOverviewReadView'
import TaalhuisCoworkersOverviewUpdateView from './TaalhuisCoworkersOverviewUpdateView'
import TaalhuisCoworkersOverviewView from './TaalhuisCoworkersOverviewView'

interface Props {}

export const CoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.coworkers.index}
                exact={true}
                to={routes.authorized.taalhuis.coworkers.overview}
            />
        </Switch>
    )
}
