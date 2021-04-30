import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'

import { NotFoundView } from 'views/Generic/NotFoundView'
// import CoworkersView from './Coworkers/CoworkersView'
// import DataUpdateView from './Data/DataUpdateView'
// import DataView from './Data/DataView'

interface Props {}

export interface SupplierDetailLocationStateProps {
    supplierId: string
    supplierName: string
}

const SupplierDetailView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as SupplierDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.bisc.read.index}
                exact={true}
                to={{ pathname: routes.authorized.supplier.bisc.read.data, state: routeState }}
            />
            {/* <Route
                path={routes.authorized.supplier.bisc.read.data}
                exact={true}
                render={() => <DataView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.update}
                exact={true}
                render={() => <DataUpdateView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.index}
                render={() => <CoworkersView routeState={routeState} />}
            /> */}
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default SupplierDetailView
