import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import React from 'react'
import { routes } from 'routes/routes'
import { ParticipantDetailLocationStateProps } from '../../../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsReferencesCreateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    return (
        <Headline
            title={i18n._(t`Nieuwe verwijzing`)}
            subtitle={'André Willemse'}
            spacingType={SpacingType.small}
            TopComponent={
                <Breadcrumbs>
                    <Breadcrumb
                        text={i18n._(t`Deelnemers`)}
                        to={routes.authorized.participants.taalhuis.participants.overview}
                    />
                </Breadcrumbs>
            }
        />
    )
}
