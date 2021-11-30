import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import SupplierCreateView from './SupplierCreateView'
import SupplierDetailView from './SupplierDetailView/SupplierDetailView'
import { SupplierOverviewView } from './SupplierOverviewView'

interface Props {}

export const BiscSupplierView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route path={routes.authorized.bisc.suppliers.index} exact={true} component={SupplierOverviewView} />
            <Route path={routes.authorized.bisc.suppliers.create} exact={true} component={SupplierCreateView} />
            <Route path={routes.authorized.bisc.suppliers.detail().index} component={SupplierDetailView} />
        </Switch>
    )
}
