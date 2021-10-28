import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { LanguageHouse, useLanguageHouseEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { NotFoundView } from 'views/Generic/NotFoundView'
import CoworkersDetailReadView from './CoworkersDetailReadView'
import CoworkersDetailUpdateView from './CoworkersDetailUpdateView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailCoworkersDetailRouteParams> {
    languageHouse: LanguageHouse
}

export const CoworkersDetailView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props
    const { languageHouseEmployeeId } = props.match.params
    const { i18n } = useLingui()

    const { data, loading, error } = useLanguageHouseEmployeeQuery({
        variables: {
            languageHouseEmployeeId,
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    const employee = data?.employee

    if (error || !employee) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    const employeeFullName = NameFormatters.formattedFullname(employee)

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
                        languageHouse={languageHouse}
                        languageHouseEmployee={employee}
                        languageHouseEmployeeFullName={employeeFullName}
                        {...props}
                    />
                )}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().data.update}
                exact={true}
                render={props => (
                    <CoworkersDetailUpdateView
                        languageHouse={languageHouse}
                        languageHouseEmployee={employee}
                        languageHouseEmployeeFullName={employeeFullName}
                        {...props}
                    />
                )}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}
