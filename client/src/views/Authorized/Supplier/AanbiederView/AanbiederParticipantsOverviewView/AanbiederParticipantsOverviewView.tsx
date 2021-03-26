import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'

import { AanbiederActiveParticipantsOverviewView } from './AanbiederActiveParticipantsOverviewView'
import { AanbiederCompletedParticipantsOverviewView } from './AanbiederCompletedParticipantsOverviewView'
import { AanbiederReferredParticipantsOverviewView } from './AanbiederReferredParticipantsOverviewView'

export const AanbiederParticipantsOverviewView: React.FunctionComponent = () => {
    const basePath = supplierRoutes.participants.overview

    return (
        <Switch>
            <Redirect path={basePath.index} exact={true} to={basePath.active} />
            <Route path={basePath.active} component={AanbiederActiveParticipantsOverviewView} />
            <Route path={basePath.completed} component={AanbiederCompletedParticipantsOverviewView} />
            <Route path={basePath.referred} component={AanbiederReferredParticipantsOverviewView} />
        </Switch>
    )
}
