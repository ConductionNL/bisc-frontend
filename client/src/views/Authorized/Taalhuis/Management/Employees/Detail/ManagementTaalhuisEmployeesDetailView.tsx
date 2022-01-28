import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/employee/employee'
import Headline from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Space from 'components/Core/Layout/Space/Space'
import { TaalhuisManagementEmployeeTabs } from 'components/Domain/Taalhuis/Management/Tabs/TaalhuisManagementEmployeeTabs'
import React from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import { TaalhuisManagementCoworkerDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ManagementTaalhuisEmployeeMenteesView } from './ManagementTaalhuisEmployeeMenteesView'
import { ManagementTaalhuisEmployeesDetailDataView } from './ManagementTaalhuisEmployeesDetailDataView'
import { ManagementTaalhuisEmployeesDetailUpdateView } from './ManagementTaalhuisEmployeesDetailUpdateView'

interface Props {}

export const ManagementTaalhuisEmployeesDetailView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { taalhuisEmployeeId } = useParams<TaalhuisManagementCoworkerDetailRouteParams>()
    const { data, refetch } = useGetOrganizationEmployee(taalhuisEmployeeId)
    const basePath = taalhuisRoutes.management.coworkers.detail()

    const name = data?.person ? NameFormatters.formattedFullname(data.person) : ''

    return (
        <>
            <Headline
                title={i18n._(t`Medewerker ${name}`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.management.overview,
                            breadcrumbItems.taalhuis.management.employees,
                        ]}
                    />
                }
            />
            <TaalhuisManagementEmployeeTabs />
            <Space pushTop={true} />
            <Switch>
                <Route path={basePath.data.index} exact={true} component={ManagementTaalhuisEmployeesDetailDataView} />
                <Route
                    path={basePath.data.update}
                    exact={true}
                    render={() => <ManagementTaalhuisEmployeesDetailUpdateView onEdit={refetch} />}
                />
                <Route path={basePath.mentees} exact={true} component={ManagementTaalhuisEmployeeMenteesView} />
                <Redirect path={basePath.index} to={basePath.data.index} />
            </Switch>
        </>
    )
}
