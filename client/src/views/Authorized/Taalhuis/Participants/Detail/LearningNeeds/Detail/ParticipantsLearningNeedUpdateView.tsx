import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetLearningNeed, usePutLearningNeed } from 'api/learningNeed/learningNeed'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { DeleteLearningNeedButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedButtonContainer'
import { participantLearningNeedFieldsMapper } from 'components/Domain/Participation/mappers/ParticipantLearningNeedFieldsMapper'
import {
    ParticipantLearningNeedFieldsFormModel,
    TaalhuisParticipantLearningNeedFields,
} from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { LearningQuestionsFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import { OfferInformationFieldsetModel } from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
// import { LearningNeedsDocument, useLearningNeedQuery, useUpdateLearningNeedMutation } from 'generated/graphql'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { routes } from 'routes/routes'
import {
    TaalhuisParticipantsDetailLearningNeedsDetailRouteParams,
    taalhuisRoutes,
} from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
// import { ParticipantsLearningNeedsDetailLocationStateProps } from './ParticipantsLearningNeedsDetailView'

// interface FormModel
//     extends OfferInformationFieldsetModel,
//         LearningOutcomeOfferFieldsetModel,
//         LearningQuestionsFieldsetModel {}

export const ParticipantsLearningNeedUpdateView: React.FC = () => {
    const {
        taalhuisParticipantId,
        learningNeedId,
    } = useParams<TaalhuisParticipantsDetailLearningNeedsDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    const { data: learningNeed, loading: getLearningNeedLoading, error: getLeaningNeedError } = useGetLearningNeed(
        learningNeedId
    )
    const { mutate: putLearningNeed, loading, error } = usePutLearningNeed(learningNeedId)

    if (getLearningNeedLoading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (getLeaningNeedError || !learningNeed) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <Form onSubmit={handleEdit}>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Leervraag aanpassen`)}
                    subtitle={NameFormatters.formattedFullname(learningNeed.student.person)}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.taalhuis.participants.overview,
                                breadcrumbItems.taalhuis.participants.detail.learningNeeds.overview(
                                    taalhuisParticipantId
                                ),
                                breadcrumbItems.taalhuis.participants.detail.learningNeeds.detail.index(
                                    taalhuisParticipantId,
                                    learningNeed.description,
                                    learningNeed.id
                                ),
                            ]}
                        />
                    }
                />
            </Column>
            {renderSection()}
        </Form>
    )

    function renderSection() {
        if (!learningNeed) {
            return null
        }

        return (
            <>
                <MutationErrorProvider mutationError={error?.data}>
                    <TaalhuisParticipantLearningNeedFields learningNeed={learningNeed} />
                </MutationErrorProvider>
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <DeleteLearningNeedButtonContainer
                            learningNeed={learningNeed}
                            onSuccessDelete={() => {
                                taalhuisRoutes.participants.detail(taalhuisParticipantId).data.learningNeeds.index
                            }}
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ParticipantLearningNeedFieldsFormModel>(e)
        const input = participantLearningNeedFieldsMapper(taalhuisParticipantId, formData)

        try {
            const response = await putLearningNeed(input)

            NotificationsManager.success(i18n._(t`Leervraag is aangepast`))

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
