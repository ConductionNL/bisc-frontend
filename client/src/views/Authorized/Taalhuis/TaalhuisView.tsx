import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ReportsView } from './Reports/ReportsView'
import { ParticipantsTaalhuisView } from './Participants/ParticipantsTaalhuisView'
import { routes } from 'routes/routes'

interface Props {}

export const TaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.index}
                exact={true}
                to={routes.authorized.taalhuis.participants.index}
            />

            <Route path={routes.authorized.taalhuis.reports.index} component={ReportsView} />
            <Route path={routes.authorized.taalhuis.participants.index} component={ParticipantsTaalhuisView} />
        </Switch>
    )
}
