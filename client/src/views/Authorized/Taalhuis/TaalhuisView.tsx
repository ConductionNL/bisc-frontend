import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsTaalhuisView } from './Participants/ParticipantsTaalhuisView'
import { ReportsView } from './Reports/ReportsView'
import { ManagementTaalhuisView } from './Management/ManagementTaalhuisView'
import { TeamsView } from './Teams/TeamsView'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.index}
                exact={true}
                to={routes.authorized.taalhuis.participants.index}
            />

            <Route path={routes.authorized.taalhuis.participants.index} component={ParticipantsTaalhuisView} />
            <Route path={routes.authorized.taalhuis.teams.index} component={TeamsView} />
            <Route path={routes.authorized.taalhuis.reports.index} component={ReportsView} />
            <Route path={routes.authorized.taalhuis.management.index} component={ManagementTaalhuisView} />
        </Switch>
    )
}
