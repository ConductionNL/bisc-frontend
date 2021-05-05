import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { BiscTaalhuizenDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'

interface Props {
    languageHouseId: string
}

const TaalhuizenCoworkersDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props

    return (
        <Breadcrumbs
            breadcrumbItems={[
                breadcrumbItems.bisc.taalhuis.overview,
                breadcrumbItems.bisc.taalhuis.detail.index('TODO_TAALHUIS_NAAM', languageHouseId),
                breadcrumbItems.bisc.taalhuis.employees.index(languageHouseId),
            ]}
        />
    )
}

export default TaalhuizenCoworkersDetailBreadcrumbs
