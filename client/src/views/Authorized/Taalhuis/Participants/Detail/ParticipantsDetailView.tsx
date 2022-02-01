import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsIntakeView } from './Intake/ParticipantIntakeView'
import { ParticipantsUpdateIntakeView } from './Intake/ParticipantUpdateIntakeView'
import { ParticipantsLearningNeedsView } from './LearningNeeds/ParticipantsLearningNeedsView'
import { ParticipantsFilesView } from './ParticipantsFilesView'
import { ParticipantsDocumentsOverviewView } from './ParticipantsDocumentsView'
import { ParticipantsDownloadDetailsView } from './ParticipantsDownloadDetailsView'
import { ParticipantsRegistrationView } from './ParticipantsRegistrationsView'
import { ParticipantMentorView } from './ParticipantMentorView/ParticipantMentorView'

export const ParticipantsDetailView: React.FunctionComponent = () => {
    const basePath = taalhuisRoutes.participants.detail()

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.data.index} />
            <Route path={basePath.data.index} exact={true} component={ParticipantsIntakeView} />
            <Route path={basePath.data.registration} exact={true} component={ParticipantsRegistrationView} />
            <Route path={basePath.data.update} exact={true} component={ParticipantsUpdateIntakeView} />
            <Route path={basePath.data.dossier.index} exact={true} component={ParticipantsFilesView} />
            <Route path={basePath.data.learningNeeds.index} component={ParticipantsLearningNeedsView} />
            <Route path={basePath.data.documents} exact={true} component={ParticipantsDocumentsOverviewView} />
            <Route path={basePath.data.downloadDetails} exact={true} component={ParticipantsDownloadDetailsView} />
            <Route path={basePath.data.mentor.index} component={ParticipantMentorView} />
        </Switch>
    )
}
