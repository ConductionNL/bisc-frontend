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
import {
    TaalhuisParticipantLearningNeedFields,
    TaalhuisParticipantLearningNeedFieldsFormModel,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { DesiredOutcomesFieldsetModel } from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import { LearningQuestionsFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import { OfferInfortmationInformationModel } from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
    useCreateLearningNeedMutation,
} from 'generated/graphql'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ParticipantDetailParams } from 'routes/participants/types'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsLearningNeedsCreateView: React.FC<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const params = useParams<ParticipantDetailParams>()
    const history = useHistory()
    const [createLearningNeed, { loading }] = useCreateLearningNeedMutation()

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

        const formData = Forms.getFormDataFromFormEvent<TaalhuisParticipantLearningNeedFieldsFormModel>(e)
        const response = await createLearningNeed({
            variables: {
                input: {
                    studentId: routeState.participantId,
                    learningNeedMotivation: '',
                    learningNeedDescription: '',
                    desiredOutComesGoal: '',
                    desiredOutComesTopic: LearningNeedTopicEnum.Attitude,
                    desiredOutComesTopicOther: '',
                    desiredOutComesApplication: LearningNeedApplicationEnum.AdministrationAndFinance,
                    desiredOutComesApplicationOther: '',
                    desiredOutComesLevel: LearningNeedLevelEnum.Inflow,
                    desiredOutComesLevelOther: '',
                    offerDesiredOffer: '',
                    offerAdvisedOffer: '',
                    offerDifference: LearningNeedOfferDifferenceEnum.YesDistance,
                    offerDifferenceOther: '',
                    offerEngagements: '',
                },
            },
        })

        if (response.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is aangemaakt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push({
            pathname: routes.authorized.participants.taalhuis.participants.detail.goals.detail.index,
            state: routeState,
        })
    }
}
