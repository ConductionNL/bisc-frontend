import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailLocationStateProps } from '../../AanbiederParticipantDetailView'
import { AanbiederParticipantGoalDetailReadView } from './AanbiederParticipantGoalsDetailReadView'
import { AanbiederParticipantsGoalsTestView } from './AanbiederParticipantsGoalsTests/AanbiederParticipantsGoalsTestView'

export interface AanbiederParticipationGoalsLocationStateProps extends AanbiederParticipantDetailLocationStateProps {
    participantGoalId: string
}

export const AanbiederParticipantGoalsDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const routeState = location.state as AanbiederParticipationGoalsLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail.goals.detail

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.overview} />
            <Route
                path={basePath.overview}
                render={() => <AanbiederParticipantGoalDetailReadView routeState={routeState} />}
            />
            <Route path={basePath.tests.index} component={AanbiederParticipantsGoalsTestView} />
        </Switch>
    )
}
