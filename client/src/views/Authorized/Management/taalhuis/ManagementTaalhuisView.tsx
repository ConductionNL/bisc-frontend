import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from '../../../../routes/routes'
import DataUpdateView from './Data/DataUpdateView'
import DataView from './Data/DataView'

interface Props {}

export const ManagementTaalhuisView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect
                path={routes.authorized.management.index}
                exact={true}
                to={routes.authorized.management.taalhuis.data.read}
            />
            <Redirect
                path={routes.authorized.management.taalhuis.index}
                exact={true}
                to={routes.authorized.management.taalhuis.data.read}
            />

            <Route path={routes.authorized.management.taalhuis.data.update} component={DataUpdateView} />
            <Route path={routes.authorized.management.taalhuis.data.read} component={DataView} />
        </Switch>
    )
}
