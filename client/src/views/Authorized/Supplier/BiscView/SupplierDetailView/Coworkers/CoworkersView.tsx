import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscSuppliersDetailRouteParams } from 'routes/bisc/biscRoutes'

import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
// import CoworkersDetailView from './CoworkerDetail/CoworkerDetailView'
// import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'

interface Props extends RouteComponentProps<BiscSuppliersDetailRouteParams> {
}

const CoworkersView: React.FunctionComponent<Props> = (props) => {
    console.log(props)
    return (
        <Switch>
            <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.index}
                exact={true}
                component={CoworkersOverviewView}
            />

            {/* <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.create}
                exact={true}
                component={CoworkersCreateView}
            /> */}

            {/* <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.detail().index}
                component={CoworkersDetailView}
            /> */}
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersView