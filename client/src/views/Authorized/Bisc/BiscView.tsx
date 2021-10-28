import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { routes } from 'routes/routes'
// import { ManagementBiscView } from '../Management/bisc/ManagementBiscView'
// import { BiscSupplierView } from '../Supplier/BiscView/BiscSupplierView'
// import { ReportsView } from './Reports/ReportsView'
import { TaalhuisView } from './Taalhuizen/TaalhuisView'

interface Props {}

export const BiscView: React.FunctionComponent<Props> = () => {
    return (
        <Switch>
            <Redirect path={routes.authorized.bisc.index} exact={true} to={routes.authorized.bisc.taalhuizen.index} />
            {/* <Route path={routes.authorized.bisc.reports.index} component={ReportsView} /> */}
            <Route path={routes.authorized.bisc.taalhuizen.index} component={TaalhuisView} />
            {/* <Route path={routes.authorized.bisc.suppliers.index} component={BiscSupplierView} /> */}
            {/* <Route path={routes.authorized.bisc.management.index} component={ManagementBiscView} /> */}
        </Switch>
    )
}
