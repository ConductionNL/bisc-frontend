import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'
import CoworkersDetailView from './CoworkerDetail/CoworkerDetailView'
import CoworkerCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'

interface Props {
    routeState: CoworkersLocationStateProps
}

export interface CoworkersLocationStateProps {
    supplierId: string
    supplierName: string
}

const CoworkersView: React.FunctionComponent<Props> = () => {
    const location = useLocation()
    const routeState = location.state as SupplierDetailLocationStateProps

    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.bisc.read.coworkers.index}
                exact={true}
                to={{ pathname: routes.authorized.supplier.bisc.read.coworkers.overview, state: routeState }}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.overview}
                exact={true}
                render={() => <CoworkersOverviewView routeState={routeState} />}
            />
            <Route
                path={routes.authorized.supplier.bisc.read.coworkers.create}
                exact={true}
                render={() => <CoworkerCreateView routeState={routeState} />}
            />
            <Route path={routes.authorized.supplier.bisc.read.coworkers.detail.index} component={CoworkersDetailView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersView
