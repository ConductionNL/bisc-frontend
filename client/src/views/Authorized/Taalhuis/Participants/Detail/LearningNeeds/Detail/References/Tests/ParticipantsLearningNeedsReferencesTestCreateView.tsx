import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import {
    ParticipantsLearningNeedReferenceTestFields,
    ParticipantsLearningNeedReferenceTestFieldsModel,
} from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { useHistory, useParams } from 'react-router-dom'
import { Forms } from 'utils/forms'
import Column from 'components/Core/Layout/Column/Column'
import CourseCard from 'components/Core/CourseCard/CourseCard'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { getMappedParticipationTestFields } from 'components/Domain/Participation/mappers/participationTestFieldsMapper'
import { useGetParticipation } from 'api/participation/participation'
import { usePostTestResult } from 'api/participation/participationTestResults'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'

export const ParticipantsLearningNeedsReferencesTestCreateView: React.FC = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<TaalhuisParticipantsDetailLearningNeedsDetailReferralsDetailRouteParams>()
    const { data, loading } = useGetParticipation(params.referralId)
    const { mutate, loading: mutationLoading, error } = usePostTestResult()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Toetsresultaat toevoegen`)}
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
                                data?.learningNeed.description || '',
                                params.learningNeedId
                            ),
                        ]}
                    />
                }
            />
            <Column spacing={6}>
                <CourseCard course={i18n._(t`Digivaardigheids cursus`)} chapter={i18n._(t`NL educatie`)} />
                <MutationErrorProvider mutationError={error?.data}>
                    <ParticipantsLearningNeedReferenceTestFields />
                </MutationErrorProvider>
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button disabled={mutationLoading} type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button
                            type={ButtonType.primary}
                            icon={IconType.send}
                            submit={true}
                            loading={loading || mutationLoading}
                        >
                            {i18n._(t`Resultaat toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<ParticipantsLearningNeedReferenceTestFieldsModel>(e)
        const input = getMappedParticipationTestFields({
            form: formData,
            learningNeedId: params.learningNeedId,
            participationId: params.referralId,
        })

        try {
            await mutate(input)

            NotificationsManager.success(
                i18n._(t`Leervraag is aangemaakt`),
                i18n._(t`Je wordt teruggestuurd naar het overzicht`)
            )

            history.push(
                taalhuisRoutes.participants
                    .detail(params.taalhuisParticipantId)
                    .data.learningNeeds.detail(params.learningNeedId).index
            )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
