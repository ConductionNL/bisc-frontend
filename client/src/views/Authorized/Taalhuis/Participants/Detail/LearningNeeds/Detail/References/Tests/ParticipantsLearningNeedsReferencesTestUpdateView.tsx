import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import {
    ParticipantsLearningNeedReferenceTestFields,
    ParticipantsLearningNeedReferenceTestFieldsModel,
} from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Forms } from 'utils/forms'
import { getMappedParticipationTestFields } from 'components/Domain/Participation/mappers/participationTestFieldsMapper'
import { useGetTestResult, usePutTestResult } from 'api/participation/participationTestResults'
import { TaalhuisParticipationTestResultRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { ParticipationProviderOption, TestResult } from 'api/types/types'
import { useGetStudent } from 'api/student/student'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ParticipantsLearningNeedsTestDeleteModal } from 'components/Domain/LearningNeeds/Modals/ParticipantsLearningNeedsTestDeleteModal'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

export const ParticipantsLearningNeedsReferencesTestUpdateView: React.FC = () => {
    const params = useParams<TaalhuisParticipationTestResultRouteParams>()
    const history = useHistory()
    const { i18n } = useLingui()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { data: student } = useGetStudent(params.taalhuisParticipantId)
    const { mutate, loading: mutateLoading, error } = usePutTestResult(params.testResultId)

    return (
        // eslint-disable-next-line react-hooks/rules-of-hooks
        <PageQuery queryHook={() => useGetTestResult(params.testResultId)}>{data => renderPageContent(data)}</PageQuery>
    )

    function renderPageContent(testResult: TestResult) {
        return (
            <Form onSubmit={handleUpdate(testResult)}>
                <Headline
                    title={i18n._(t`Toetsresultaat`)}
                    subtitle={student ? NameFormatters.formattedFullname(student.person) : undefined}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.taalhuis.participants.overview,
                                breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(
                                    params.taalhuisParticipantId
                                ),
                                breadcrumbItems.taalhuis.participants.detail.learningNeeds.detail.index(
                                    params.taalhuisParticipantId,
                                    testResult.learningNeedOutCome.learningNeed.description,
                                    params.learningNeedId
                                ),
                            ]}
                        />
                    }
                />
                {renderSection(testResult)}
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            icon={IconType.delete}
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`Toetsresultaat verwijderen`)}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                disabled={mutateLoading}
                                type={ButtonType.secondary}
                                onClick={() => history.goBack()}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button
                                type={ButtonType.primary}
                                icon={IconType.send}
                                submit={true}
                                loading={mutateLoading}
                            >
                                {i18n._(t`Verwijzen`)}
                            </Button>
                        </Row>
                    }
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <ParticipantsLearningNeedsTestDeleteModal onClose={() => setModalIsVisible(false)} {...params} />
                </Modal>
            </Form>
        )
    }

    function renderSection(testResult: TestResult) {
        const participation = testResult.participation

        return (
            <Column spacing={6}>
                <CourseCard
                    course={testResult.learningNeedOutCome.learningNeed.advisedOffer}
                    chapter={
                        (participation?.providerOption === ParticipationProviderOption.Other
                            ? participation?.providerOther
                            : participation?.provider?.name) || ''
                    }
                />
                <MutationErrorProvider mutationError={error?.data}>
                    <ParticipantsLearningNeedReferenceTestFields defaultValues={testResult} />
                </MutationErrorProvider>
            </Column>
        )
    }

    function handleUpdate(testResult: TestResult) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<ParticipantsLearningNeedReferenceTestFieldsModel>(e)
            const input = getMappedParticipationTestFields({
                form: formData,
                defaultTestResultId: testResult.id,
                learningNeedId: params.learningNeedId,
                participationId: params.referralId,
            })

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Deelnemer is bijgewerkt`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )

                history.push(
                    taalhuisRoutes.participants
                        .detail(params.taalhuisParticipantId)
                        .data.learningNeeds.detail(params.learningNeedId).index
                )
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }
}
