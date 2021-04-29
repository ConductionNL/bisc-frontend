import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { InfoBlock } from 'components/Core/Containers/InfoBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisParticipantLearningNeedReferenceFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceCreateFields'
import {
    DetailsCertificateWillBeAwarded,
    DetailsInformationFieldsetFormalityEnum,
    DetailsInformationFieldsetModel,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { OfferInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import { SupplierInformationFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import { useCreateParticipationMutation } from '../../../../../../../../../generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Forms } from 'utils/forms'
import { ParticipantsLearningNeedsReferencesLocationStateProps } from './ParticipantsLearningNeedsReferencesView'

interface Props {
    routeState: ParticipantsLearningNeedsReferencesLocationStateProps
}

interface FormModel
    extends SupplierInformationFieldsetModel,
        OfferInformationFieldsetModel,
        LearningOutcomeOfferFieldsetModel,
        DetailsInformationFieldsetModel {}

export const ParticipantsLearningNeedsReferencesCreateView: React.FC<Props> = ({ routeState }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const [createLearningNeedReference, { loading }] = useCreateParticipationMutation()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe verwijzing`)}
                subtitle={'André Willemse'}
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
            <Column spacing={4}>
                <InfoBlock type="info">
                    <Row>
                        <Paragraph bold={true}>{i18n._(t`Geadviseerd aanbod`)}</Paragraph>
                        <Paragraph>{i18n._(t`Digivaardigheidscursus`)}</Paragraph>
                    </Row>
                </InfoBlock>
                <TaalhuisParticipantLearningNeedReferenceFields />
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createLearningNeedReference({
            variables: {
                input: {
                    learningNeedId: routeState.participantId,
                    providerName: formData.supplierId ?? formData.supplierName,
                    providerNote: formData.note,
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
                    detailsTotalClassHours: parseInt(formData.detailsTotalClassHours),
                    detailsCertificateWillBeAwarded:
                        formData.detailsCertificateWillBeAwarded === DetailsCertificateWillBeAwarded.Yes ? true : false,
                    detailsStartDate: new Date(formData.detailsStartDate),
                    detailsEndDate: new Date(formData.detailsStartDate),
                    detailsEngagements: formData.detailsEngagements,
                },
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Deelnemer is aangemaakt`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )
    }
}
