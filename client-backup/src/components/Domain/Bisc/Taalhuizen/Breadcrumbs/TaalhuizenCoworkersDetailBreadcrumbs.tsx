import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import React from 'react'

interface Props {
    languageHouseId: string
    languageHouseName: string
}

const TaalhuizenCoworkersDetailBreadcrumbs: React.FunctionComponent<Props> = props => {
    const { languageHouseId, languageHouseName } = props

    return (
        <Breadcrumbs
            breadcrumbItems={[
                breadcrumbItems.bisc.taalhuis.overview,
                breadcrumbItems.bisc.taalhuis.detail.index(languageHouseName, languageHouseId),
                breadcrumbItems.bisc.taalhuis.employees.index(languageHouseId),
            ]}
        />
    )
}

export default TaalhuizenCoworkersDetailBreadcrumbs
