import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederActiveParticipantsOverviewView } from './AanbiederActiveParticipantsOverviewView'
import { AanbiederCompletedParticipantsOverviewView } from './AanbiederCompletedParticipantsOverviewView'
import { AanbiederReferredParticipantsOverviewView } from './AanbiederReferredParticipantsOverviewView'
import { AanbiederParticipantView } from './AanbiederParticipantView/AanbiederParticipantView'

export const AanbiederView: React.FunctionComponent = () => {
    const supplierRoute = routes.authorized.supplier
    const participantRoute = supplierRoute.participants

    return (
        <Switch>
            <Redirect path={supplierRoute.index} exact={true} to={participantRoute.overview.active} />
            <Route path={participantRoute.overview.active} component={AanbiederActiveParticipantsOverviewView} />
            <Route path={participantRoute.overview.completed} component={AanbiederCompletedParticipantsOverviewView} />
            <Route path={participantRoute.overview.referred} component={AanbiederReferredParticipantsOverviewView} />
            <Route path={participantRoute.detail.overview} component={AanbiederParticipantView} />
        </Switch>
    )
}
