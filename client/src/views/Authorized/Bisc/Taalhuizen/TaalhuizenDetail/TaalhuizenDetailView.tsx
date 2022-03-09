import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { TaalhuisDetailDataView } from './Data/TaalhuisDetailDataView'
import { routes } from 'routes/routes'
import { TaalhuisDetailUpdateView } from './Data/TaalhuisDetailUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import Center from 'components/Core/Layout/Center/Center'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { useGetTaalhuisOrganization } from 'api/organization/organization'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = props => {
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
            <Redirect
                path={routes.authorized.bisc.taalhuizen.detail().index}
                exact={true}
                to={routes.authorized.bisc.taalhuizen.detail().data.index}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.index}
                exact={true}
                render={props => <TaalhuisDetailDataView {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.update}
                exact={true}
                render={props => <TaalhuisDetailUpdateView {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                render={props => <CoworkersView organization={data} {...props} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
