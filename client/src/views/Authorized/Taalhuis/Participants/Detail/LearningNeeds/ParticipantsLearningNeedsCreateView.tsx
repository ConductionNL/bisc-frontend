import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { usePostLearningNeed } from 'api/learningNeed/learningNeed'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { participantLearningNeedFieldsMapper } from 'components/Domain/Participation/mappers/ParticipantLearningNeedFieldsMapper'
import {
    ParticipantLearningNeedFieldsFormModel,
    TaalhuisParticipantLearningNeedFields,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsCreateView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const { mutate: postLearningNeed, loading, error } = usePostLearningNeed()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe leervraag`)}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.participants.overview,
                            breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(taalhuisParticipantId),
                        ]}
                    />
                }
            />
            <MutationErrorProvider mutationError={error?.data}>
                <TaalhuisParticipantLearningNeedFields />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantLearningNeedFieldsFormModel>(e)
        const input = participantLearningNeedFieldsMapper(taalhuisParticipantId, formData)

        try {
            const response = await postLearningNeed(input)

            NotificationsManager.success(
                i18n._(t`Leervraag is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de leervraag`)
            )

            history.push(
                taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.detail(response.id).index
            )
        } catch (error: any) {
            if (!error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
                console.error(error)
            }
        }
    }
}
