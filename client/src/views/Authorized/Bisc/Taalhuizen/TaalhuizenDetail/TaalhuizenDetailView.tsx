import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom'
import { NotFoundView } from '../../../../Generic/NotFoundView'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import DataView from './Data/DataView'
import { routes } from 'routes/routes'
import DataUpdateView from './Data/DataUpdateView'
import { CoworkersView } from './Coworkers/CoworkersView'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { useLanguageHouseQuery } from 'generated/graphql'
import Center from 'components/Core/Layout/Center/Center'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {}

const TaalhuizenDetailView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()

    const { data, loading, error } = useLanguageHouseQuery({
        variables: { languageHouseId: languageHouseId },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    const languageHouse = data?.languageHouse

    if (error || !languageHouse) {
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
                render={props => <DataView languageHouse={languageHouse} {...props} />}
            />
            <Route
                path={routes.authorized.bisc.taalhuizen.detail().data.update}
                exact={true}
                render={props => <DataUpdateView languageHouse={languageHouse} {...props} />}
            />

            <Route
                path={routes.authorized.bisc.taalhuizen.detail().coworkers.index}
                render={props => <CoworkersView languageHouse={languageHouse} {...props} />}
            />
            <Route component={NotFoundView} />
        </Switch>
    )
}

export default TaalhuizenDetailView
