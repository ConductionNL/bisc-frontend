import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { routes } from 'routes/routes'
import { SupplierOverviewView } from './SupplierOverviewView'

export const AanbiederSupplierView: React.FunctionComponent = () => {
    const supplierRoute = routes.authorized.supplier

    return (
        <Switch>
            <Redirect path={supplierRoute.index} exact={true} to={supplierRoute.overview} />
            <Route path={supplierRoute.overview} component={SupplierOverviewView} />
        </Switch>
    )
}
