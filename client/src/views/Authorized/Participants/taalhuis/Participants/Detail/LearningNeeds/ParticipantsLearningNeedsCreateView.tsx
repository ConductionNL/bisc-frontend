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
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from 'temp/TEMPORARYgraphql'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsCreateView: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { routeState } = props
    const history = useHistory()
    const [createLearningNeed, { loading }] = useCreateLearningNeedMutation()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe leervraag`)}
                subtitle={routeState.participantName}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.taalhuis.participants.overview,
                            breadcrumbItems.taalhuis.participants.detail.goals.overview,
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
                    studentId: routeState.participantId,
                    learningNeedMotivation: formData.motivations,
                    learningNeedDescription: formData.decription,
                    desiredOutComesGoal: formData.outComesGoal,
                    desiredOutComesTopic:
                        LearningNeedTopicEnum[formData.outComesTopic as keyof typeof LearningNeedTopicEnum],
                    desiredOutComesTopicOther: formData.outComesTopic,
                    desiredOutComesApplication:
                        LearningNeedApplicationEnum[
                            formData.outComesApplication as keyof typeof LearningNeedApplicationEnum
                        ],
                    desiredOutComesApplicationOther: formData.outComesApplicationOther,
                    desiredOutComesLevel:
                        LearningNeedLevelEnum[formData.outComesLevel as keyof typeof LearningNeedLevelEnum],
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
                    variables: {
                        studentId: routeState.participantId,
                    },
                },
            ],
        })

        if (response.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(i18n._(t`Leerdoel is aangemaakt`), i18n._(t`U word doorgestuurd naar de gegevens`))

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.index,
            state: routeState,
        })
    }
}
