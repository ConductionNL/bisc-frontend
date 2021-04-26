import React from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import SupplierInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { LearningNeedsReferenceDetails } from '../Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'

interface Props {
    defaultValues?: LearningNeedsReferenceDetails
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedReferenceFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
    const { i18n } = useLingui()

    return (
        <Column>
            <SupplierInformationFieldset
                readOnly={readOnly}
                defaultValues={{
                    aanbiederName: defaultValues?.participation.providerName ?? undefined,
                    aanbiederNote: defaultValues?.participation.providerNote ?? undefined,
                }}
            />
            <HorizontalRule />
            <Column spacing={8}>
                <div>
                    <SectionTitle title={'Aanvullende informatie deelname'} heading={'H3'} />
                    <Paragraph>{i18n._(t`Invullen indien bekend`)}</Paragraph>
                </div>
                <OfferInformationFieldset
                    readOnly={readOnly}
                    defaultValues={{
                        offerName: defaultValues?.participation.offerName ?? undefined,
                        offerCourse: defaultValues?.participation.offerCourse ?? undefined,
                    }}
                />
                <HorizontalRule />
                <LearningOutcomeOfferFieldset
                    readOnly={readOnly}
                    defaultValues={{
                        outComesGoal: defaultValues?.participation.outComesGoal ?? undefined,
                        outComesTopic: defaultValues?.participation.outComesTopic ?? undefined,
                        outComesTopicOther: defaultValues?.participation.outComesTopicOther ?? undefined,
                        outComesApplication: defaultValues?.participation.outComesApplication ?? undefined,
                        outComesApplicationOther: defaultValues?.participation.outComesApplicationOther ?? undefined,
                        outComesLevel: defaultValues?.participation.outComesLevel ?? undefined,
                        outComesLevelOther: defaultValues?.participation.outComesLevelOther ?? undefined,
                    }}
                />
                <HorizontalRule />
                <DetailsInformationFieldset
                    readOnly={readOnly}
                    defaultValues={
                        defaultValues && {
                            detailsIsFormal: defaultValues.participation.detailsIsFormal ?? undefined,
                            detailsGroupFormation: defaultValues.participation.detailsGroupFormation ?? undefined,
                            detailsTotalClassHours: defaultValues.participation.detailsTotalClassHours ?? undefined,
                            detailsCertificateWillBeAwarded:
                                defaultValues.participation.detailsCertificateWillBeAwarded ?? undefined,
                            detailsStartDate: `${defaultValues.participation.detailsStartDate}` ?? undefined,
                            detailsEndDate: `${defaultValues.participation.detailsEndDate}` ?? undefined,
                            detailsEngagements: defaultValues.participation.detailsEngagements ?? undefined,
                        }
                    }
                />
            </Column>
        </Column>
    )
}
