import { useLingui } from '@lingui/react'
import React from 'react'
import { t } from '@lingui/macro'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { Breadcrumbs } from 'components/Core/Breadcrumb/Breadcrumbs'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { breadcrumbItems } from 'components/Core/Breadcrumb/breadcrumbItems'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsRegistrationView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    return (
        <Headline
            title={i18n._(t`Aanmeldingen`)}
            spacingType={SpacingType.small}
            TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
        />
    )
}
