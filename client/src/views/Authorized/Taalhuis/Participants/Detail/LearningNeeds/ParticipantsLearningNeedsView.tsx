import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsLearningNeedsOverviewView } from './ParticipantLearningNeedsOverviewView'
import { ParticipantsLearningNeedsCreateView } from './ParticipantsLearningNeedsCreateView'
import { ParticipantsLearningNeedsDetailView } from './Detail/ParticipantsLearningNeedsDetailView'

export const ParticipantsLearningNeedsView: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.index}
                exact={true}
                component={ParticipantsLearningNeedsOverviewView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.create}
                exact={true}
                component={ParticipantsLearningNeedsCreateView}
            />
            <Route
                path={taalhuisRoutes.participants.detail().data.learningNeeds.detail().index}
                component={ParticipantsLearningNeedsDetailView}
            />
        </Switch>
    )
}
