import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { routes } from 'routes/routes'
import { AanbiederParticipantsOverviewView } from './AanbiederParticipantsOverviewView'

export const AanbiederView: React.FunctionComponent = () => {
    const supplierRoute = routes.authorized.supplier

    return (
        <Switch>
            <Redirect path={supplierRoute.index} exact={true} to={supplierRoute.overview} />
            <Route path={supplierRoute.overview} component={AanbiederParticipantsOverviewView} />
        </Switch>
    )
}
