import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkerDetailDataUpdateView from './CoworkerDetailData/CoworkerDetailDataUpdateView'
import CoworkerDetailDataView from './CoworkerDetailData/CoworkerDetailDataView'
import CoworkerDetailDocumentsView from './CoworkerDetailDocuments/CoworkerDetailDocumentsView'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.index()}
                exact={true}
                component={CoworkerDetailDocumentsView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.documents.index()}
                exact={true}
                component={CoworkerDetailDocumentsView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.data.update()}
                exact={true}
                component={CoworkerDetailDataUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
