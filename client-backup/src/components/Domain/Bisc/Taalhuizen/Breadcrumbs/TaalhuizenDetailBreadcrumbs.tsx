import React from 'react'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'

interface Props {}

const TaalhuizenDetailBreadcrumbs: React.FunctionComponent<Props> = () => {
    return <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />
}

export default TaalhuizenDetailBreadcrumbs
