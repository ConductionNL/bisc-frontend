import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederProfileManagementEmployeeDetailOverviewView } from './AanbiederProfileManagementEmployeeDetailOverviewView'
import { AanbiederProfileManagementEmployeesOverviewView } from './AanbiederProfileManagementEmployeesOverviewView'

export const AanbiederProfileManagementEmployeesView: React.FunctionComponent = () => {
    const { employees } = supplierRoutes.profileManagement

    const location = useLocation()
    const props = location.state as { employeeId: number }

    return (
        <Switch>
            <Redirect path={employees.index} exact={true} to={employees.overview} />
            <Route path={employees.overview} component={AanbiederProfileManagementEmployeesOverviewView} />
            <Route
                path={employees.detail.overview}
                render={() => <AanbiederProfileManagementEmployeeDetailOverviewView {...props} />}
            />
            <Route path={employees.detail.participants} component={AanbiederProfileManagementEmployeesOverviewView} />
            <Route path={employees.detail.documents} component={AanbiederProfileManagementEmployeesOverviewView} />
        </Switch>
    )
}
