import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import { ManagementOverviewView } from './ManagementOverviewView'
import ManagementMedewerkersCreateView from './medewerkers/ManagementMedewerkersCreateView'
import ManagementMedewerkersReadView from './medewerkers/ManagementMedewerkersReadView'
import ManagementMedewerkersUpdate from './medewerkers/ManagementMedewerkersUpdate'

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
            <Route path={routes.authorized.management.medewerkers.create} component={ManagementMedewerkersCreateView} />
            <Route path={routes.authorized.management.medewerkers.read()} component={ManagementMedewerkersReadView} />
            <Route path={routes.authorized.management.medewerkers.update()} component={ManagementMedewerkersUpdate} />
        </Switch>
    )
}
