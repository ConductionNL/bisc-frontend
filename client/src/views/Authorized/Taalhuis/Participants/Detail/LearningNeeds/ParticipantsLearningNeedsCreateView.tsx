import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import {
    TaalhuisParticipantLearningNeedFields,
    TaalhuisParticipantLearningNeedFieldsFormModel,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { LearningNeedsDocument, useCreateLearningNeedMutation } from 'generated/graphql'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { Forms } from 'utils/forms'

export const ParticipantsLearningNeedsCreateView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()
    const [createLearningNeed, { loading }] = useCreateLearningNeedMutation()

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

        const formData = Forms.getFormDataFromFormEvent<TaalhuisParticipantLearningNeedFieldsFormModel>(e)
        const response = await createLearningNeed({
            variables: {
                input: {
                    studentId: taalhuisParticipantId,
                    learningNeedMotivation: formData.motivations,
                    learningNeedDescription: formData.decription,
                    desiredOutComesGoal: formData.outComesGoal,
                    desiredOutComesTopic: formData.outComesTopic,
                    desiredOutComesTopicOther: formData.outComesTopic,
                    desiredOutComesApplication: formData.outComesApplication,
                    desiredOutComesApplicationOther: formData.outComesApplicationOther,
                    desiredOutComesLevel: formData.outComesLevel,
                    desiredOutComesLevelOther: formData.outComesLevelOther,
                    offerDesiredOffer: formData.offerDesiredOffer,
                    offerAdvisedOffer: formData.offerAdvisedOffer,
                    offerDifference: formData.offerDifference,
                    offerDifferenceOther: formData.offerDifferenceOther,
                    offerEngagements: formData.offerEngagements,
                },
            },
            refetchQueries: [
                {
                    query: LearningNeedsDocument,
                    variables: { studentId: taalhuisParticipantId },
                },
            ],
        })

        if (response.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(i18n._(t`Leerdoel is aangemaakt`), i18n._(t`U word doorgestuurd naar de gegevens`))

        const id = response.data.createLearningNeed?.learningNeed?.id
        history.push(taalhuisRoutes.participants.detail().data.learningNeeds.detail(id).index)
    }
}
