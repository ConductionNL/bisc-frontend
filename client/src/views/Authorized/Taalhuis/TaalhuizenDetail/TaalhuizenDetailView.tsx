import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { routes } from '../../../../routes'
import { NotFoundView } from '../../../Generic/NotFoundView'
import { TaalhuisCoworkersView } from './TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersView'
import TaalhuizenOverviewReadView from './TaalhuizenOverviewReadView'
import TaalhuizenOverviewUpdateView from './TaalhuizenOverviewUpdateView'
import TaalhuisCoworkerCreateView from './TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkerCreateView'

interface Props {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.taalhuis.read.index()}
                exact={true}
                to={routes.authorized.taalhuis.read.data()}
            />
            <Route path={routes.authorized.taalhuis.read.data()} exact={true} component={TaalhuizenOverviewReadView} />
            <Route
                path={routes.authorized.taalhuis.read.update()}
                exact={true}
                component={TaalhuizenOverviewUpdateView}
            />
            <Route
                path={routes.authorized.taalhuis.read.create()}
                exact={true}
                component={TaalhuisCoworkerCreateView}
            />
            <Route path={routes.authorized.taalhuis.read.detail.index()} component={TaalhuisCoworkersView} />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
