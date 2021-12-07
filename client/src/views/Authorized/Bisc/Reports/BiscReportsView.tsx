import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'

import { BiscReportsOverviewView } from './BiscReportsOverviewView'

interface Props {}

export const BiscReportsView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.reports.index}
                exact={true}
                to={routes.authorized.bisc.reports.overview}
            />
            <Route path={routes.authorized.bisc.reports.overview} exact={true} component={BiscReportsOverviewView} />
        </Switch>
    )
}
