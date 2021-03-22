import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederActiveParticipantsOverviewView } from './AanbiederActiveParticipantsOverviewView'
import { AanbiederParticipantView } from './AanbiederParticipantView/AanbiederParticipantView'

export const AanbiederView: React.FunctionComponent = () => {
    const supplierRoute = routes.authorized.supplier

    return (
        <Switch>
            <Redirect path={supplierRoute.index} exact={true} to={supplierRoute.participants.active} />
            <Route path={supplierRoute.participants.active} component={AanbiederActiveParticipantsOverviewView} />
            <Route path={supplierRoute.participant.overview} component={AanbiederParticipantView} />
        </Switch>
    )
}
