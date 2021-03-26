import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederParticipantDetailView } from './AanbiederParticipantDetailView/AanbiederParticipantDetailView'
import { AanbiederParticipantsOverviewView } from './AanbiederParticipantsOverviewView/AanbiederParticipantsOverviewView'
import { AanbiederProfileManagementView } from './AanbiederProfileManagementView/AanbiederProfileManagementView'

export const AanbiederView: React.FunctionComponent = () => {
    const { participants, profileManagement } = supplierRoutes

    return (
        <Switch>
            <Redirect path={supplierRoutes.index} exact={true} to={participants.overview.index} />
            <Route path={participants.overview.index} component={AanbiederParticipantsOverviewView} />
            <Route path={participants.detail.index} component={AanbiederParticipantDetailView} />
            <Route path={profileManagement.index} component={AanbiederProfileManagementView} />
        </Switch>
    )
}
