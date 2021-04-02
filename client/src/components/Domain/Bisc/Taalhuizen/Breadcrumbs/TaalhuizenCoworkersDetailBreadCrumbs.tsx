import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React from 'react'
import { TaalhuizenDetailLocationStateProps } from 'views/Authorized/Bisc/Taalhuizen/TaalhuizenDetail/TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

const TaalhuizenCoworkersDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    return (
        <Breadcrumbs
            breadcrumbItems={[
                breadcrumbItems.bisc.taalhuis.overview,
                breadcrumbItems.bisc.taalhuis.detail.index(routeState.taalhuisName, routeState),
                breadcrumbItems.bisc.taalhuis.employees.index(routeState),
            ]}
        />
    )
}

export default TaalhuizenCoworkersDetailBreadcrumbs
