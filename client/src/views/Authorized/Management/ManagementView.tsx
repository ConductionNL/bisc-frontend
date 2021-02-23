import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import { ManagementOverviewView } from './ManagementOverviewView'

interface Props {}

export const ManagementView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.overview}
            />
            <Route path={routes.authorized.management.overview} component={ManagementOverviewView} />
        </Switch>
    )
}
