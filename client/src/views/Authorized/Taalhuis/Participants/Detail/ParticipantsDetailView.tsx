import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsIntakeView } from './Intake/ParticipantIntakeView'
import { ParticipantsUpdateIntakeView } from './Intake/ParticipantUpdateIntakeView'
import { ParticipantsRegistrationView } from './ParticipantsRegistrationsView'
import { ParticipantsFilesView } from './ParticipantsFilesView'
// import { ParticipantsDocumentsOverviewView } from './Documents/ParticipantsDocumentsView'
// import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantsLearningNeedsView'

export const ParticipantsDetailView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.participants.detail().index}
                exact={true}
                to={taalhuisRoutes.participants.detail().data.index}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.index}
                exact={true}
                component={ParticipantsIntakeView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.update}
                exact={true}
                component={ParticipantsUpdateIntakeView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.registration}
                exact={true}
                component={ParticipantsRegistrationView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.dossier.index}
                exact={true}
                component={ParticipantsFilesView}
            />
            {/* <Route
                path={taalhuisRoutes.participants.detail().data.documents}
                exact={true}
                component={ParticipantsDocumentsOverviewView}
            /> */}
            {/* <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.index}
                component={ParticipantsLearningNeedsView}
            /> */}
        </Switch>
    )
}
