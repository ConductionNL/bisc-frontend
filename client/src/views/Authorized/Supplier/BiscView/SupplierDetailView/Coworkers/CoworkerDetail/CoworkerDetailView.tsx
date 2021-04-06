import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import { CoworkerDetailDataUpdateView } from './CoworkerDetailDataUpdateView'
import CoworkerDetailDataView from './CoworkerDetailDataView'
import CoworkerDetailDocumentsView from './CoworkerDetailDocumentsView'

export interface CoworkersDetailLocationStateProps {
    supplierId: string
    supplierName: string
    coworkerId: string
    coworkerName: string
}

const CoworkersDetailView: React.FunctionComponent = () => {
    const location = useLocation()
    const routeState = location.state as CoworkersDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.bisc.read.coworkers.detail.index}
                exact={true}
                to={{
                    pathname: routes.authorized.supplier.bisc.read.coworkers.detail.data.index,
                    state: routeState,
                }}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.detail.data.index}
                exact={true}
                render={() => <CoworkerDetailDataView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.detail.data.update}
                exact={true}
                render={() => <CoworkerDetailDataUpdateView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.detail.documents.index}
                exact={true}
                render={() => <CoworkerDetailDocumentsView routeState={routeState} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
