import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederParticipantsView } from './AanbiederParticipantsView/AanbiederParticipantsView'
import { AanbiederProfileManagementView } from './AanbiederProfileManagementView/AanbiederProfileManagementView'

export const AanbiederView: React.FunctionComponent = () => {
    const { participants, profileManagement } = supplierRoutes

    return (
        <Switch>
            <Redirect path={supplierRoutes.index} exact={true} to={participants.index} />
            <Route path={participants.index} component={AanbiederParticipantsView} />
            <Route path={profileManagement.index} component={AanbiederProfileManagementView} />
        </Switch>
    )
}
