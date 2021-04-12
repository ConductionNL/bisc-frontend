import React from 'react'
import { Route, Switch, useLocation } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailOverviewView } from './AanbiederParticipantDetailOverviewView'
import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'
// import { AanbiederParticipantGoalsView } from './AanbiederParticipantGoalsView/AanbiederParticipantGoalsView'
// import { AanbiederParticipantRegistrationView } from './AanbiederParticipantRegistrationView'

interface LocationStateProps {
    participantId: number
}

export const AanbiederParticipantDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const props = location.state as LocationStateProps

    const basePath = routes.authorized.supplier.participants.detail

    return (
        <Switch>
            <Route path={basePath.overview} render={() => <AanbiederParticipantDetailOverviewView {...props} />} />
            <Route path={basePath.registration} render={() => <AanbiederParticipantRegistrationView {...props} />} />
            <Route path={basePath.goals.index} component={AanbiederParticipantGoalsView} />
        </Switch>
    )
}
