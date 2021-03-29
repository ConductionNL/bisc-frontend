import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ParticipantDetailParams } from 'routes/participants/types'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'
import { LearningNeedsDetails } from './mocks/learningNeeds'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

interface FormModel {}

export const ParticipantsLearningNeedsCreateView: React.FC<Props> = () => {
    const { i18n } = useLingui()
    const params = useParams<ParticipantDetailParams>()
    const history = useHistory()
    const [createLearningNeed, { loading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleCreate}>
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
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
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

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createLearningNeed(formData)

            const learningNeed = response as LearningNeedsDetails

            NotificationsManager.success(
                i18n._(t`Deelnemer is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
        } catch (e) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}
