import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { TestInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import { useCreateTestResultMutation } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

interface FormModel extends LearningOutcomeOfferFieldsetModel, TestInformationFieldsetModel {}

export const AanbiederParticipantsGoalsTestCreateView: React.FC<Props> = ({ routeState }) => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createLearningNeedReferenceTest, { loading }] = useCreateTestResultMutation()

    const basePath = routes.authorized.supplier.participants.detail.goals.detail

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
                subtitle={'Een random naam'}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.aanbieder.participants.overview,
                            breadcrumbItems.aanbieder.participants.detail.goals.overview,
                            {
                                label: i18n._(t`Met computers leren werken`),
                                to: basePath.overview,
                            },
                        ]}
                    />
                }
            />
            <Column spacing={6}>
                <CourseCard course={i18n._(t`Digivaardigheids cursus`)} chapter={i18n._(t`NL educatie`)} />
                <ParticipantsLearningNeedReferenceTestFields />
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(
                                    routes.authorized.supplier.participants.detail.goals.overview,
                                    routeState.participantId
                                )
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Resultaat toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createLearningNeedReferenceTest({
            variables: {
                input: {
                    participationId: routeState.participantId,
                    outComesGoal: formData.outComesGoal,
                    outComesTopic: formData.outComesTopic,
                    outComesTopicOther: formData.outComesTopicOther,
                    outComesApplication: formData.outComesApplication,
                    outComesApplicationOther: formData.outComesApplicationOther,
                    outComesLevel: formData.outComesLevel,
                    outComesLevelOther: formData.outComesLevelOther,
                    examUsedExam: formData.usedTests,
                    examDate: formData.testDate,
                    examMemo: formData.memo,
                },
            },
        })

        if (response?.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is aangemaakt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
    }
}
