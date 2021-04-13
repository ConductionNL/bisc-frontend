import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailOverviewView } from './AanbiederParticipantDetailOverviewView'
import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'
// import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
// import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'

export interface AanbiederParticipantDetailLocationStateProps {
    participantId: string
}

export const AanbiederParticipantDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const props = location.state as AanbiederParticipantDetailLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail

    return (
        <Switch>
            <Route
                path={basePath.overview}
                render={() => <AanbiederParticipantDetailOverviewView routeState={props} />}
            />
            <Route
                path={basePath.registration}
                render={() => <AanbiederParticipantRegistrationView routeState={props} />}
            />
            <Route path={basePath.goals.index} component={AanbiederParticipantGoalsView} />
        </Switch>
    )
}
