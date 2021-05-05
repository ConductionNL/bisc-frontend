import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersView from './Coworkers/CoworkersView'
import DataUpdateView from './Data/DataUpdateView'
import DataView from './Data/DataView'

interface Props {}

const SupplierDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.suppliers.detail().index}
                exact={true}
                to={routes.authorized.bisc.suppliers.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.suppliers.detail().data.index}
                exact={true}
                component={DataView}
            />
            <Route
                path={routes.authorized.bisc.suppliers.detail().data.update}
                exact={true}
                component={DataUpdateView}
            />
            <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.index}
                component={CoworkersView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default SupplierDetailView
