import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import { supplierRoutes } from 'routes/supplier/supplierRoutes'
import { AanbiederManagementEmployeeDetailOverviewView } from './AanbiederManagementEmployeeDetailOverviewView'
import { AanbiederManagementEmployeeDocumentsView } from './AanbiederManagementEmployeeDocumentsView'
import { AanbiederManagementEmployeeParticipantsView } from './AanbiederManagementEmployeeParticipantsView'
import { AanbiederManagementEmployeesCreateView } from './AanbiederManagementEmployeesCreateView'
import { AanbiederManagementEmployeesOverviewView } from './AanbiederManagementEmployeesOverviewView'
export interface AanbiederManagementEmployeesLocationStateProps {
    employeeId: string
}
export const AanbiederManagementEmployeesView: React.FunctionComponent = () => {
    const { employees } = supplierRoutes.management

    const location = useLocation()
    const routeState = location.state as AanbiederManagementEmployeesLocationStateProps

    return (
        <Switch>
            <Redirect path={employees.index} exact={true} to={employees.overview} />
            <Route path={employees.overview} component={AanbiederManagementEmployeesOverviewView} />
            <Route path={employees.create} component={AanbiederManagementEmployeesCreateView} />
            <Route
                path={employees.detail.overview}
                render={() => <AanbiederManagementEmployeeDetailOverviewView routeState={routeState} />}
            />
            <Route
                path={employees.detail.participants}
                render={() => <AanbiederManagementEmployeeParticipantsView routeState={routeState} />}
            />
            <Route
                path={employees.detail.documents}
                render={() => <AanbiederManagementEmployeeDocumentsView routeState={routeState} />}
            />
        </Switch>
    )
}
