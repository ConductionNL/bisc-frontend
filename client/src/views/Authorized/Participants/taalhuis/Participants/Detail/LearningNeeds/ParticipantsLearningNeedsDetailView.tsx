import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedReadView } from './Details/ParticipantsLearningNeedsReadView'
import { ParticipantsLearningNeedUpdateView } from './Details/ParticipantsLearningNeedsUpdateView'
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
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.read()}
                exact={true}
                component={ParticipantsLearningNeedReadView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.goals.update()}
                exact={true}
                component={ParticipantsLearningNeedUpdateView}
            />
        </Switch>
    )
}
