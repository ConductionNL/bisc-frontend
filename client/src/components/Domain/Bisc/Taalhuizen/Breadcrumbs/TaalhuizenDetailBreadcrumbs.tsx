import React from 'react'
import { breadcrumbItems } from 'components/Core/Breadcrumb/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumb/Breadcrumbs'

interface Props {}

const TaalhuizenDetailBreadcrumbs: React.FunctionComponent<Props> = () => {
    return <Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />
}

export default TaalhuizenDetailBreadcrumbs
