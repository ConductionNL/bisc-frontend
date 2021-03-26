import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantDetailView } from './AanbiederParticipantDetailView/AanbiederParticipantDetailView'
import { AanbiederParticipantsOverviewView } from './AanbiederParticipantsOverviewView/AanbiederParticipantsOverviewView'

export const AanbiederView: React.FunctionComponent = () => {
    const supplierRoute = routes.authorized.supplier
    const participantRoute = supplierRoute.participants

    return (
        <Switch>
            <Redirect path={supplierRoute.index} exact={true} to={participantRoute.overview.index} />
            <Route path={participantRoute.overview.index} component={AanbiederParticipantsOverviewView} />
            <Route path={participantRoute.detail.index} component={AanbiederParticipantDetailView} />
        </Switch>
    )
}
