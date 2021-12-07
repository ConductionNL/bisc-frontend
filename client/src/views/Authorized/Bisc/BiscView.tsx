import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ManagementBiscView } from './Management/ManagementBiscView'
import { BiscReportsView } from './Reports/BiscReportsView'
import { BiscSupplierView } from './Supplier/BiscSupplierView'
import { TaalhuisView } from './Taalhuizen/TaalhuisView'

interface Props {}

export const BiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.bisc.index} exact={true} to={routes.authorized.bisc.taalhuizen.index} />
            <Route path={routes.authorized.bisc.taalhuizen.index} component={TaalhuisView} />
            <Route path={routes.authorized.bisc.suppliers.index} component={BiscSupplierView} />
            <Route path={routes.authorized.bisc.reports.index} component={BiscReportsView} />
            <Route path={routes.authorized.bisc.management.index} component={ManagementBiscView} />
        </Switch>
    )
}
