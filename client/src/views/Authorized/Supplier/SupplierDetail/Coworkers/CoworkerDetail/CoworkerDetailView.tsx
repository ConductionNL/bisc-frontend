import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCoordinatorDetailUpdateView from './CoworkerCoordinatorDetailUpdateView'
import CoworkersCoordinatorDetailView from './CoworkerCoordinatorDetailView'

interface Props {}

const CoworkersDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.index()}
                exact={true}
                component={CoworkersCoordinatorDetailView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.update()}
                exact={true}
                component={CoworkersCoordinatorDetailUpdateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersDetailView
