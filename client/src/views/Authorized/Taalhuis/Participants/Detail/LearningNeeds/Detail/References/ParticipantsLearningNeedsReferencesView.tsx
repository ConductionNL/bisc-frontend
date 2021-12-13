import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { ParticipantsLearningNeedsReferencesCreateView } from './ParticipantsLearningNeedsReferencesCreateView'
import { ParticipantsLearningNeedsReferencesUpdateView } from './ParticipantsLearningNeedsReferencesUpdateView'
import { ParticipantsLearningNeedsReferencesTestCreateView } from './Tests/ParticipantsLearningNeedsReferencesTestCreateView'
import { ParticipantsLearningNeedsReferencesTestUpdateView } from './Tests/ParticipantsLearningNeedsReferencesTestUpdateView'

export const ParticipantsLearningNeedsReferencesView: React.FunctionComponent = () => {
    const basePath = taalhuisRoutes.participants.detail().data.learningNeeds.detail().referrals

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.create} />

            <Route path={basePath.create} exact={true} component={ParticipantsLearningNeedsReferencesCreateView} />
            <Route
                path={basePath.detail().testResult.create}
                exact={true}
                component={ParticipantsLearningNeedsReferencesTestCreateView}
            />
            <Route
                path={basePath.detail().testResult.update()}
                exact={true}
                component={ParticipantsLearningNeedsReferencesTestUpdateView}
            />

            <Route
                path={basePath.detail().update}
                exact={true}
                component={ParticipantsLearningNeedsReferencesUpdateView}
            />
        </Switch>
    )
}
