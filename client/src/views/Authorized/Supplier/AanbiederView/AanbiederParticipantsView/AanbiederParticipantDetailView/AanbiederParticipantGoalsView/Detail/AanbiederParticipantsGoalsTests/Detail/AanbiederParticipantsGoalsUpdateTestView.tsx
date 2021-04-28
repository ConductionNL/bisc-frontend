import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ParticipantsLearningNeedReferenceTestFields } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantsLearningNeedsTestDeleteModal } from 'components/Domain/LearningNeeds/Modals/ParticipantsLearningNeedsTestDeleteModal'
import { learningNeedsCourseData } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'
import { ParticipantDetailLocationStateProps } from 'views/Authorized/Participants/taalhuis/Participants/Detail/ParticipantsDetailView'
import { useTestResultQuery, useUpdateTestResultMutation } from 'generated/graphql'
import { TestInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

interface FormModel extends LearningOutcomeOfferFieldsetModel, TestInformationFieldsetModel {}

export const AanbiederParticipantsGoalsTestUpdateView: React.FC<Props> = props => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { routeState } = props
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { data: courseData } = useMockQuery(learningNeedsCourseData)
    const { data, loading, error } = useTestResultQuery({
        variables: {
            testResultId: routeState.testResultId,
        },
    })
    const [updateLearningNeedReference, { loading: updateLoading }] = useUpdateTestResultMutation()

    const basePath = routes.authorized.supplier.participants.detail.goals.detail

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
                subtitle={routeState.participantName}
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
            {renderSection()}
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setModalIsVisible(true)}>
                        {i18n._(t`Toetsresultaat verwijderen`)}
                    </Button>
                }
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ParticipantsLearningNeedsTestDeleteModal onClose={() => setModalIsVisible(false)} />
            </Modal>
        </Form>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return (
                <Column spacing={6}>
                    {renderCourseCard()}
                    <ConditionalCard warning={true} grow={true}>
                        <Column>
                            <Paragraph bold={true}>
                                {i18n._(t`Let op! Voer voor deze deelnemer geen toetsresultaten in!`)}
                            </Paragraph>
                            <Paragraph>
                                {i18n._(
                                    t`Deze deelnemer heeft aangegeven geen toetsresultaten met Taalhuizen te willen delen.`
                                )}
                            </Paragraph>
                        </Column>
                    </ConditionalCard>
                    <ParticipantsLearningNeedReferenceTestFields defaultValues={data.testResult} />
                </Column>
            )
        }
    }

    function renderCourseCard() {
        if (courseData) {
            return <CourseCard course={courseData.course} chapter={courseData.chapter} />
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateLearningNeedReference({
            variables: {
                input: {
                    testResultId: '',
                    outComesGoal: formData.outComesGoal,
                    outComesTopic: formData.outComesTopic,
                    outComesTopicOther: formData.outComesTopicOther,
                    outComesApplication: formData.outComesApplication,
                    outComesApplicationOther: formData.outComesApplication,
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
            i18n._(t`Deelnemer is bijgewerkt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
    }
}
