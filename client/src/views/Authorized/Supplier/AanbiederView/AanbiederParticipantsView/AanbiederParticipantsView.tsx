import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'

import { AanbiederParticipantsOverviewView } from './AanbiederParticipantsOverviewView'
import { AanbiederParticipantDetailView } from './AanbiederParticipantDetailView/AanbiederParticipantDetailView'
// import { AanbiederActiveParticipantsOverviewView } from './AanbiederActiveParticipantsOverviewView'
// import { AanbiederCompletedParticipantsOverviewView } from './AanbiederCompletedParticipantsOverviewView'
// import { AanbiederReferredParticipantsOverviewView } from './AanbiederReferredParticipantsOverviewView'

export const AanbiederParticipantsView: React.FunctionComponent = () => {
    const basePath = supplierRoutes.participants

    return (
        <Switch>
            {/* TODO: temporary routes -- delete after 2nd sprint */}
            <Redirect path={basePath.index} exact={true} to={basePath.overview} />
            <Route path={basePath.overview} component={AanbiederParticipantsOverviewView} />

            {/* TODO: part of 2nd sprint */}
            {/* <Redirect path={basePath.index} exact={true} to={basePath.active} />
            <Route path={basePath.active} component={AanbiederActiveParticipantsOverviewView} />
            <Route path={basePath.completed} component={AanbiederCompletedParticipantsOverviewView} />
            <Route path={basePath.referred} component={AanbiederReferredParticipantsOverviewView} /> */}

            <Route path={basePath.detail.index} component={AanbiederParticipantDetailView} />
        </Switch>
    )
}
