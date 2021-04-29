import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { InfoBlock } from 'components/Core/Containers/InfoBlock'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DeleteLearningNeedReferenceButtonContainer } from 'components/Domain/LearningNeeds/Containers/DeleteLearningNeedReferenceButtonContainer'
import { TaalhuisParticipantLearningNeedReferenceFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceCreateFields'
import {
    DetailsCertificateWillBeAwarded,
    DetailsInformationFieldsetFormalityEnum,
    DetailsInformationFieldsetModel,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { OfferInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import { SupplierInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantsLearningNeedsReferencesLocationStateProps } from '../ParticipantsLearningNeedsReferencesView'
import { useParticipationQuery, useUpdateParticipationMutation } from 'generated/graphql'

interface Props {
    routeState: ParticipantsLearningNeedsReferencesLocationStateProps
}

interface FormModel
    extends SupplierInformationFieldsetModel,
        OfferInformationFieldsetModel,
        LearningOutcomeOfferFieldsetModel,
        DetailsInformationFieldsetModel {}

export const ParticipantsLearningNeedsReferencesUpdateView: React.FC<Props> = ({ routeState }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useParticipationQuery({
        variables: {
            participationId: routeState.participantId,
        },
    })
    const [updateLearningNeedReference, { loading: updateLoading }] = useUpdateParticipationMutation()

    if (!routeState.participantId) {
        return null
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Nieuwe verwijzing`)}
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
            {renderSection()}
            <Actionbar
                LeftComponent={
                    <DeleteLearningNeedReferenceButtonContainer
                        // TODO: add back when backend is available
                        // refetchQueries={[
                        //     {
                        //         query: LearningNeedsDocument,
                        //         variables: {
                        //             studentId: routeState.participantId,
                        //         },
                        //     },
                        // ]}
                        variables={{ id: routeState.participantId }}
                        learningNeedName={routeState.participantName}
                        onSuccessfullDelete={() =>
                            history.push({
                                pathname:
                                    routes.authorized.participants.taalhuis.participants.detail.goals.detail.index,
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

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
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
                <Column spacing={4}>
                    <InfoBlock type="info">
                        <Row>
                            <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                            <Paragraph> {i18n._(t`Digivaardigheidscursus`)}</Paragraph>
                        </Row>
                    </InfoBlock>
                    <TaalhuisParticipantLearningNeedReferenceFields
                    // TODO: implement with real types
                    // defaultValues={{
                    //     formality: data?.detailsIsFormal,
                    //     groupFormation: data.
                    //     teachingHours: prefillData?.detailsTotalClassHours,
                    //     certificate: prefillData?.detailsCertificateWillBeAwarded,
                    //     startDate: prefillData?.detailsStartDate ?? undefined,
                    //     endDate: prefillData?.detailsEndDate ?? undefined,
                    //     engagements: undefined,
                    // }}
                    />
                </Column>
            )
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateLearningNeedReference({
            variables: {
                input: {
                    participationId: routeState.participantId,
                    providerId: formData.supplierId,
                    providerName: formData.supplierName ?? '',
                    providerNote: formData.note ?? '',
                    offerName: formData.offerName,
                    offerCourse: formData.courseType,
                    outComesGoal: formData.outComesGoal,
                    outComesTopic: formData.outComesTopic,
                    outComesTopicOther: formData.outComesTopicOther,
                    outComesApplication: formData.outComesApplication,
                    outComesApplicationOther: formData.outComesApplicationOther,
                    outComesLevel: formData.outComesLevel,
                    outComesLevelOther: formData.outComesLevelOther,
                    detailsIsFormal:
                        formData.detailsIsFormal === DetailsInformationFieldsetFormalityEnum.formal ? true : false,
                    detailsGroupFormation: formData.detailsGroupFormation,
                    detailsTotalClassHours: Number(formData.detailsTotalClassHours),
                    detailsCertificateWillBeAwarded:
                        formData.detailsCertificateWillBeAwarded === DetailsCertificateWillBeAwarded.Yes ? true : false,
                    detailsStartDate: new Date(formData.detailsStartDate),
                    detailsEndDate: new Date(formData.detailsEndDate),
                    detailsEngagements: formData.detailsEngagements,
                },
            },
        })

        if (response?.errors?.length || !response?.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is bijgewerkt`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )
    }
}
