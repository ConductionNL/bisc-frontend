import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ParticipantDetailParams } from 'routes/participants/types'
import { routes } from 'routes/routes'

interface Props {}

export const ParticipantsLearningNeedsCreateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const params = useParams<ParticipantDetailParams>()
    const history = useHistory()

    return (
        <>
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
            <TaalhuisParticipantLearningNeedFields />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )
}
