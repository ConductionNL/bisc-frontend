import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import { routes } from '../../../../../../../routes/routes'
interface Props {}

export const ParticipantsRegistrationView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    return (
        <Headline
            title={i18n._(t`Deelnemer leervragen`)}
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
