import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedsView } from './ParticipantLearningNeedsView'
import { ParticipantsLearningNeedsCreateView } from './ParticipantsLearningNeedsCreateView'

interface Props {}

export const ParticipantsLearningNeedsDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.participants.taalhuis.participants.detail.goals.index}
                exact={true}
                to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                exact={true}
                component={ParticipantsLearningNeedsView}
            />

            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.create}
                exact={true}
                component={ParticipantsLearningNeedsCreateView}
            />
        </Switch>
    )
}
