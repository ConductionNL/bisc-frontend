import { LearningNeedsReferenceDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'
import React from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import SupplierInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningOutcomeOfferFieldset'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

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
                    aanbiederName: defaultValues?.participation.aanbiederName ?? undefined,
                    aanbiederNote: defaultValues?.participation.aanbiederNote ?? undefined,
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
                            detailsIsFormal: defaultValues.participation.detailsIsFormal,
                            detailsGroupFormation: defaultValues.participation.detailsGroupFormation,
                            detailsTotalClassHours: defaultValues.participation.detailsTotalClassHours,
                            detailsCertificateWillBeAwarded:
                                defaultValues.participation.detailsCertificateWillBeAwarded,
                            detailsStartDate: defaultValues.participation.detailsStartDate,
                            detailsEndDate: defaultValues.participation.detailsEndDate,
                            detailsEngagements: defaultValues.participation.detailsEngagements,
                        }
                    }
                />
            </Column>
        </Column>
    )
}
