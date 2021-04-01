import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import React from 'react'
import { routes } from 'routes/routes'
import { TaalhuizenDetailLocationStateProps } from 'views/Authorized/Bisc/Taalhuizen/TaalhuizenDetail/TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

const TaalhuizenCoworkersDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    return (
        <Breadcrumbs>
            <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.bisc.taalhuizen.overview} />
            <Breadcrumb
                text={routeState.taalhuisName}
                to={{
                    pathname: routes.authorized.bisc.taalhuizen.detail.index,
                    hash: '',
                    search: '',
                    state: routeState,
                }}
            />
            <Breadcrumb
                text={i18n._(t`Medewerkers`)}
                to={{
                    pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.index,
                    hash: '',
                    search: '',
                    state: routeState,
                }}
            />
        </Breadcrumbs>
    )
}

export default TaalhuizenCoworkersDetailBreadcrumbs
