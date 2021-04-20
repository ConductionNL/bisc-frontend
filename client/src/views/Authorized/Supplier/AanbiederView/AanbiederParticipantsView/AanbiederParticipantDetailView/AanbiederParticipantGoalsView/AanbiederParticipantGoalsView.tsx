import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { Redirect } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailLocationStateProps } from '../AanbiederParticipantDetailView'
import { AanbiederParticipantGoalDetailView } from './AanbiederParticipantGoalDetailView'
import { AanbiederParticipantGoalsOverviewView } from './AanbiederParticipantGoalsOverviewView'

export interface AanbiederParticipationGoalsLocationStateProps extends AanbiederParticipantDetailLocationStateProps {
    participantGoalId: string
}

export const AanbiederParticipantGoalsView: React.FunctionComponent = () => {
    const location = useLocation()
    const routeState = location.state as AanbiederParticipationGoalsLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail.goals

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.overview} />
            <Route
                path={basePath.overview}
                render={() => <AanbiederParticipantGoalsOverviewView routeState={routeState} />}
            />
            <Route
                path={basePath.detail}
                render={() => <AanbiederParticipantGoalDetailView routeState={routeState} />}
            />
        </Switch>
    )
}
