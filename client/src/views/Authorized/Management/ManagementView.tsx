import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import ManagementCoworkerCreateView from './coworkers/ManagementCoworkerCreateView'
import ManagementCoworkerReadView from './coworkers/ManagementCoworkerReadView'
import ManagementCoworkerUpdateView from './coworkers/ManagementCoworkerUpdateView'
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
            <Route path={routes.authorized.management.coworkers.create} component={ManagementCoworkerCreateView} />
            <Route path={routes.authorized.management.coworkers.read()} component={ManagementCoworkerReadView} />
            <Route path={routes.authorized.management.coworkers.update()} component={ManagementCoworkerUpdateView} />
        </Switch>
    )
}
