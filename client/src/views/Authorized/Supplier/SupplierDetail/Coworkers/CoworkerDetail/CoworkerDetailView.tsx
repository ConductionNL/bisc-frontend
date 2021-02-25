import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../../../../../routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkerCreateView from '../CoworkersCreateView'
import { CoworkersOverviewView } from '../CoworkersOverviewView'

interface Props {}

const CoworkersView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.index()}
                exact={true}
                component={CoworkersOverviewView}
            />
            <Route
                path={routes.authorized.supplier.read.coworkers.detail.update()}
                exact={true}
                component={CoworkerCreateView}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default CoworkersView
