import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import { ManagementOverviewView } from './ManagementOverviewView'
import ManagementMedewerkersCreateView from './coworkers/ManagementCoworkersCreateView'
import ManagementMedewerkersReadView from './coworkers/ManagementCoworkersReadView'
import ManagementMedewerkersUpdate from './coworkers/ManagementCoworkersUpdate'

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
            <Route path={routes.authorized.management.coworkers.create} component={ManagementMedewerkersCreateView} />
            <Route path={routes.authorized.management.coworkers.read()} component={ManagementMedewerkersReadView} />
            <Route path={routes.authorized.management.coworkers.update()} component={ManagementMedewerkersUpdate} />
        </Switch>
    )
}
