import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederGroupsDetailParticipantsView } from './AanbiederGroupsDetailParticipants'
import { AanbiederGroupsDetailReadView } from './AanbiederGroupsDetailReadView'
import { AanbiederGroupsDetailUpdateView } from './AanbiederGroupsDetailUpdateView'

export interface AanbiederGroupDetailLocationProps {
    groupId: string
}

export const AanbiederGroupsDetailView: React.FunctionComponent = () => {
    const { detail } = supplierRoutes.groups

    const location = useLocation()
    const routeState = location.state as AanbiederGroupDetailLocationProps

    return (
        <Switch>
            <Redirect path={detail.index} exact={true} to={detail.read} />
            <Route path={detail.read} render={() => <AanbiederGroupsDetailReadView routeState={routeState} />} />
            <Route path={detail.update} render={() => <AanbiederGroupsDetailUpdateView routeState={routeState} />} />
            <Route
                path={detail.participants}
                render={() => <AanbiederGroupsDetailParticipantsView routeState={routeState} />}
            />
        </Switch>
    )
}
