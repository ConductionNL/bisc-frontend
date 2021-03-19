import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../routes/routes'
import { ParticipantsReadView } from './Intake/ParticipantReadView'
import { ParticipantsUpdateView } from './Intake/ParticipantUpdateView'

interface Props {}

export const ParticipantsDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <h1>test</h1>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.index()}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.detail.read()}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.read()}
                exact={true}
                component={ParticipantsReadView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.update()}
                exact={true}
                component={ParticipantsUpdateView}
            />
        </Switch>
    )
}
