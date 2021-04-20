import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederDocumentsView } from './AanbiederDocumentsView/AanbiederDocumentsView'
import { AanbiederParticipantDetailOverviewView } from './AanbiederParticipantDetailOverviewView'
import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'
import { AanbiederParticipantFilesView } from './AanbiederParticipantsFilesView/AanbiederParticipantFilesView'

export interface AanbiederParticipantDetailLocationStateProps {
    participantId: string
}

export const AanbiederParticipantDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const routeState = location.state as AanbiederParticipantDetailLocationStateProps

    const basePath = routes.authorized.supplier.participants.detail

    return (
        <Switch>
            <Route
                path={basePath.overview}
                render={() => <AanbiederParticipantDetailOverviewView routeState={routeState} />}
            />
            <Route
                path={basePath.registration}
                render={() => <AanbiederParticipantRegistrationView routeState={routeState} />}
            />
            <Route path={basePath.files} render={() => <AanbiederParticipantFilesView routeState={routeState} />} />
            <Route path={basePath.documents} render={() => <AanbiederDocumentsView routeState={routeState} />} />
            <Route path={basePath.goals.index} component={AanbiederParticipantGoalsView} />
        </Switch>
    )
}
