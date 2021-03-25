import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import React from 'react'
import { useParams } from 'react-router-dom'
import { ParticipantDetailParams } from 'routes/participants/types'
import { routes } from 'routes/routes'

interface Props {}

export const ParticipantsLearningNeedsCreateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const params = useParams<ParticipantDetailParams>()

    return (
        <Headline
            title={i18n._(t`Nieuwe leervraag`)}
            subtitle={params.participantname}
            spacingType={SpacingType.small}
            TopComponent={
                <Breadcrumbs>
                    <Breadcrumb
                        text={i18n._(t`Deelnemers`)}
                        to={routes.authorized.participants.taalhuis.participants.overview}
                    />
                    <Breadcrumb
                        text={i18n._(t`Leervragen`)}
                        to={routes.authorized.participants.taalhuis.participants.detail.goals.overview()}
                    />
                </Breadcrumbs>
            }
        />
    )
}
