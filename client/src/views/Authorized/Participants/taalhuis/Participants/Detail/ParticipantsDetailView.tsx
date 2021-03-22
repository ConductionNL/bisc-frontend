import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../../../routes/routes'
import { ParticipantsFilesView } from './Files/ParticipantsFilesView'
import { ParticipantsReadView } from './Intake/ParticipantReadView'
import { ParticipantsUpdateView } from './Intake/ParticipantUpdateView'
import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantLearningNeedsView'
import { ParticipantsRegistrationView } from './Registration/ParticipantsRegistrationsView'

interface Props {}

export const ParticipantsDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
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
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.registration()}
                exact={true}
                component={ParticipantsRegistrationView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.files()}
                exact={true}
                component={ParticipantsFilesView}
            />
            <Route
                path={routes.authorized.participants.taalhuis.participants.detail.learningNeeds()}
                exact={true}
                component={ParticipantsLearningNeedsView}
            />
        </Switch>
    )
}
