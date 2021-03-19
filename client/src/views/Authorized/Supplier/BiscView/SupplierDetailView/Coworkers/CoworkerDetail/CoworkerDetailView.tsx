import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkerDetailDataUpdateView from './CoworkerDetailDataUpdateView'
import CoworkerDetailDataView from './CoworkerDetailDataView'
import CoworkerDetailDocumentsView from './CoworkerDetailDocumentsView'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.supplier.read.coworkers.detail.index()}
                exact={true}
                to={routes.authorized.supplier.read.coworkers.detail.data.index()}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.index()}
                exact={true}
                component={CoworkerDetailDataView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.update()}
                exact={true}
                component={CoworkerDetailDataUpdateView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.documents.index()}
                exact={true}
                component={CoworkerDetailDocumentsView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
