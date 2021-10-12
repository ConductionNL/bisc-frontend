import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployee } from 'api/authentication/employee'
import { Organization } from 'api/types/types'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersDetailReadView from './CoworkersDetailReadView'
import CoworkersDetailUpdateView from './CoworkersDetailUpdateView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    organization: Organization
}

export const CoworkersDetailView: React.FunctionComponent<Props> = props => {
    const { organization } = props
    const { languageHouseEmployeeId } = props.match.params
    const { i18n } = useLingui()

    const { data: employee, loading, error } = useGetOrganizationEmployee(languageHouseEmployeeId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !employee) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const employeeFullName = NameFormatters.formattedFullname(employee.person)

    return (
        <Switch>
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.index}
                exact={true}
                render={props => (
                    <CoworkersDetailReadView
                        organization={organization}
                        organizationEmployee={employee}
                        organizationEmployeeFullName={employeeFullName}
                        {...props}
                    />
                )}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.update}
                exact={true}
                render={props => (
                    <CoworkersDetailUpdateView
                        organization={organization}
                        organizationEmployee={employee}
                        organizationEmployeeFullName={employeeFullName}
                        {...props}
                    />
                )}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
