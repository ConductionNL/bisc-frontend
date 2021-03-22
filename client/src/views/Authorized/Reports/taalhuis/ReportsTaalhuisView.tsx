import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import { ReportsOverviewView } from './ReportsOverviewView'

interface Props {}

export const ReportsTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.reports.index}
                exact={true}
                to={routes.authorized.reports.taalhuis.overview}
            />
            <Redirect
                path={routes.authorized.reports.taalhuis.index}
                exact={true}
                to={routes.authorized.reports.taalhuis.overview}
            />
            <Route path={routes.authorized.reports.taalhuis.overview} component={ReportsOverviewView} />
        </Switch>
    )
}
