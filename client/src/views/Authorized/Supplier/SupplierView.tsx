import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../routes'
import { SupplierOverviewView } from './SupplierOverviewView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.supplier.index} exact={true} to={routes.authorized.supplier.overview} />
            <Route path={routes.authorized.supplier.index} component={SupplierOverviewView} />
        </Switch>
    )
}
