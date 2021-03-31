import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import React from 'react'
import { routes } from 'routes/routes'

interface Props {}

const TaalhuizenDetailBreadcrumbs: React.FunctionComponent<Props> = () => {
    return (
        <Breadcrumbs>
            <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.bisc.taalhuizen.overview} />
        </Breadcrumbs>
    )
}

export default TaalhuizenDetailBreadcrumbs
