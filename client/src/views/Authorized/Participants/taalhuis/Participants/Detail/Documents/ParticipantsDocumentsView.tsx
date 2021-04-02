import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {}

export const ParticipantsDocumentsView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    return (
        <Headline
            title={i18n._(t`Documents`)}
            spacingType={SpacingType.small}
            TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
        />
    )
}
