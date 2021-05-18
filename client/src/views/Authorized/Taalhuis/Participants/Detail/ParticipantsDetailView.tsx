import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsIntakeView } from './Intake/ParticipantIntakeView'
// import { ParticipantsDocumentsOverviewView } from './Documents/ParticipantsDocumentsView'
// import { ParticipantsFilesView } from './Files/ParticipantsFilesView'
// import { ParticipantsUpdateIntakeView } from './Intake/ParticipantUpdateIntakeView'
// import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantsLearningNeedsView'
// import { ParticipantsRegistrationView } from './Registration/ParticipantsRegistrationsView'

export const ParticipantsDetailView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Redirect
                path={taalhuisRoutes.participants.detail().index}
                exact={true}
                to={taalhuisRoutes.participants.detail().data.index}
            />

            {/* TODO: these routes should have their own RouteView when there are more screens then 1 */}
            <Route
                path={taalhuisRoutes.participants.detail().data.index}
                exact={true}
                component={ParticipantsIntakeView}
            />
            {/* <Route
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
            <Route
                path={taalhuisRoutes.participants.detail().data.documents}
                exact={true}
                component={ParticipantsDocumentsOverviewView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.index}
                component={ParticipantsLearningNeedsView}
            /> */}
        </Switch>
    )
}
