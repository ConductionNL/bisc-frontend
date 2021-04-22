import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
import { DeleteLearningNeedButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedButtonContainer'
import { TaalhuisParticipantLearningNeedFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { LearningQuestionsFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import { OfferInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { LearningNeedsDocument } from 'generated/graphql'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { learningNeedsMockResponse } from '../mocks/learningNeeds'
import { ParticipantsLearningNeedsDetailLocationStateProps } from './ParticipantsLearningNeedsDetailView'
interface Props {
    routeState: ParticipantsLearningNeedsDetailLocationStateProps
}
interface FormModel
    extends OfferInformationFieldsetModel,
        LearningOutcomeOfferFieldsetModel,
        LearningQuestionsFieldsetModel {}

export const ParticipantsLearningNeedUpdateView: React.FC<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useMockQuery(learningNeedsMockResponse)
    const [editLearningNeed, { loading: updateLoading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleEdit}>
            <Column spacing={4}>
                <Headline
                    title={i18n._(t`Leervraag aanpassen`)}
                    subtitle={routeState.participantName}
                    spacingType={SpacingType.small}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.taalhuis.participants.overview,
                                breadcrumbItems.taalhuis.participants.detail.goals.overview,
                                breadcrumbItems.taalhuis.participants.detail.goals.detail.read(routeState),
                            ]}
                        />
                    }
                />
            </Column>
            {renderSection()}
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
                <>
                    <TaalhuisParticipantLearningNeedFields learningNeed={data} />
                    <Space pushTop={true} />
                    <Actionbar
                        LeftComponent={
                            <DeleteLearningNeedButtonContainer
                                refetchQueries={[
                                    {
                                        query: LearningNeedsDocument,
                                        variables: {
                                            studentId: routeState.participantId,
                                        },
                                    },
                                ]}
                                variables={{ id: routeState.participantId }}
                                learningNeedName={routeState.participantName}
                                onSuccessfullDelete={() =>
                                    history.push({
                                        pathname: routes.authorized.participants.taalhuis.participants.index,
                                        state: routeState,
                                    })
                                }
                            />
                        }
                        RightComponent={
                            <Row>
                                <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                                    {i18n._(t`Annuleren`)}
                                </Button>

                                <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                                    {i18n._(t`Opslaan`)}
                                </Button>
                            </Row>
                        }
                    />
                </>
            )
        }
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            await editLearningNeed(formData)

            history.push(routes.authorized.participants.taalhuis.participants.detail.goals.detail.read)

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
