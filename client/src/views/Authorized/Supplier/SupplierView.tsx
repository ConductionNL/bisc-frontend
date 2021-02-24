import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import SupplierCreateView from './SupplierCreateView'
import { SupplierOverviewView } from './SupplierOverviewView'
import SupplierReadView from './SupplierReadView'
import SupplierUpdateView from './SupplierUpdateView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.supplier.index} exact={true} to={routes.authorized.supplier.overview} />
            <Route path={routes.authorized.supplier.overview} exact={true} component={SupplierOverviewView} />
            <Route path={routes.authorized.supplier.create} exact={true} component={SupplierCreateView} />
            <Route path={routes.authorized.supplier.update()} exact={true} component={SupplierUpdateView} />
            <Route path={routes.authorized.supplier.read()} exact={true} component={SupplierReadView} />
        </Switch>
    )
}
