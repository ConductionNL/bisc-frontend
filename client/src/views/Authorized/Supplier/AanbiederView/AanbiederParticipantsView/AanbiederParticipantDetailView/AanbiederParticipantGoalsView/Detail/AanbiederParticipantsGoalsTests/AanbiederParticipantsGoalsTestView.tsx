import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ParticipantsLearningNeedsReferencesTestLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/Details/Tests/ParticipantsLearningNeedsReferencesTestView'
import { AanbiederParticipantDetailLocationStateProps } from '../../../AanbiederParticipantDetailView'
import { AanbiederParticipantsGoalsTestCreateView } from './AanbiederParticipantsGoalsCreateTestView'
import { AanbiederParticipantsGoalsTestUpdateView } from './Detail/AanbiederParticipantsGoalsUpdateTestView'

export interface AanbiederParticipantsLearningNeedsReferencesTestLocationStateProps
    extends AanbiederParticipantDetailLocationStateProps {}

export const AanbiederParticipantsGoalsTestView: React.FunctionComponent<AanbiederParticipantsLearningNeedsReferencesTestLocationStateProps> = () => {
    const location = useLocation<ParticipantsLearningNeedsReferencesTestLocationStateProps>()
    const routeState = location.state as ParticipantsLearningNeedsReferencesTestLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail.goals.detail.tests

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.create} />

            <Route
                path={basePath.create}
                render={() => <AanbiederParticipantsGoalsTestCreateView routeState={routeState} />}
            />

            <Route
                path={basePath.update}
                render={() => <AanbiederParticipantsGoalsTestUpdateView routeState={routeState} />}
            />
        </Switch>
    )
}
