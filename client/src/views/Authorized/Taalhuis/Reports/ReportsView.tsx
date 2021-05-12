import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'

import { ReportsOverviewView } from './ReportsOverviewView'

interface Props {}

export const ReportsView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.reports.index}
                exact={true}
                to={routes.authorized.taalhuis.reports.overview}
            />
            <Route path={routes.authorized.taalhuis.reports.overview} exact={true} component={ReportsOverviewView} />
        </Switch>
    )
}
