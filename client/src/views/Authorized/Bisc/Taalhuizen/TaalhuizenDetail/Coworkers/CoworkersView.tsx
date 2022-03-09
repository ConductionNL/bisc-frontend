import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetTaalhuisOrganization } from 'api/organization/organization'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from '../../../../../../routes/routes'
import { NotFoundView } from '../../../../../Generic/NotFoundView'
import CoworkersCreateView from './CoworkersCreateView'
import CoworkersOverviewView from './CoworkersOverviewView'
import { CoworkersDetailView } from './detail/CoworkersDetailView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

export const CoworkersView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()

    const { data, loading, error } = useGetTaalhuisOrganization(languageHouseId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Switch>
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                exact={true}
                render={props => <CoworkersOverviewView organization={data} {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.create}
                exact={true}
                render={props => <CoworkersCreateView languageHouse={data} {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.detail().index}
                render={props => <CoworkersDetailView organization={data} {...props} />}
            />

            <Route component={NotFoundView} />
        </Switch>
    )
}
