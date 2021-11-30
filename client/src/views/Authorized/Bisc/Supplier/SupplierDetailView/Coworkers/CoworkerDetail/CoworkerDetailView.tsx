import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import { CoworkerDetailDataUpdateView } from './CoworkerDetailDataUpdateView'
import CoworkerDetailDataView from './CoworkerDetailDataView'
// import CoworkerDetailDocumentsView from './CoworkerDetailDocumentsView'

const CoworkersDetailView: React.FunctionComponent = (props) => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.suppliers.detail().coworkers.detail().index}
                exact={true}
                to={routes.authorized.bisc.suppliers.detail().coworkers.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.detail().data.index}
                exact={true}
                component={CoworkerDetailDataView}
            />
            <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.detail().data.update}
                exact={true}
                component={CoworkerDetailDataUpdateView}
            />
            {/* <Route
                path={routes.authorized.bisc.suppliers.detail().coworkers.detail().data.documents}
                exact={true}
                component={CoworkerDetailDocumentsView}
            /> */}
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
