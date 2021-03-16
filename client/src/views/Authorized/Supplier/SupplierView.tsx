import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { UserContext } from '../../../components/Providers/UserProvider/context'
import { Type } from '../../../components/Providers/UserProvider/types'
import { routes } from '../../../routes/routes'
import SupplierCreateView from './SupplierCreateView'
import SupplierDetailView from './SupplierDetail/SupplierDetailView'
import { SupplierOverviewView } from './SupplierOverviewView'

interface Props {}

export const SupplierView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)

    if (userContext.user?.environment === Type.bisc) {
        return (
            <Switch>
                <Redirect
                    path={routes.authorized.supplier.index}
                    exact={true}
                    to={routes.authorized.supplier.overview}
                />
                <Route path={routes.authorized.supplier.overview} exact={true} component={SupplierOverviewView} />
                <Route path={routes.authorized.supplier.create} exact={true} component={SupplierCreateView} />
                <Route path={routes.authorized.supplier.read.index()} component={SupplierDetailView} />
            </Switch>
        )
    }

    return null
}
