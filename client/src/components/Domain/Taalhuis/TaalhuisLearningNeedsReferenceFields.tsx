import React, { useState } from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import SupplierInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'

interface Props {
    // defaultValues?: LearningNeedsReferenceDetails
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedReferenceFields: React.FC<Props> = props => {
    const { readOnly } = props
    const { i18n } = useLingui()
    // TODO: replace initial value with default
    const [showCustomFields, setShowCustomFields] = useState(false)

    return (
        <Column>
            <SupplierInformationFieldset
                readOnly={readOnly}
                onSupplierChange={hasSelectedOther => setShowCustomFields(hasSelectedOther)}
                defaultValues={
                    {
                        // providerName: defaultValues?.participation.providerName ?? undefined,
                        // providerNote: defaultValues?.participation.providerNote ?? undefined,
                    }
                }
            />
            {showCustomFields && renderCustomFields()}
        </Column>
    )

    function renderCustomFields() {
        return (
            <>
                <HorizontalRule />
                <Column spacing={8}>
                    <div>
                        <SectionTitle title={'Aanvullende informatie deelname'} heading={'H3'} />
                        <Paragraph>{i18n._(t`Invullen indien bekend`)}</Paragraph>
                    </div>
                    <OfferInformationFieldset
                        readOnly={readOnly}
                        defaultValues={
                            {
                                // offerName: defaultValues?.participation.offerName ?? undefined,
                                // offerCourse: defaultValues?.participation.offerCourse ?? undefined,
                            }
                        }
                    />
                    <HorizontalRule />
                    <LearningOutcomeOfferFieldset
                        sectionTitle={i18n._('Leeruitkomst aanbod')}
                        readOnly={readOnly}
                        defaultValues={
                            {
                                // outComesGoal: defaultValues?.participation.outComesGoal ?? undefined,
                                // outComesTopic: defaultValues?.participation.outComesTopic ?? undefined,
                                // outComesTopicOther: defaultValues?.participation.outComesTopicOther ?? undefined,
                                // outComesApplication: defaultValues?.participation.outComesApplication ?? undefined,
                                // outComesApplicationOther: defaultValues?.participation.outComesApplicationOther ?? undefined,
                                // outComesLevel: defaultValues?.participation.outComesLevel ?? undefined,
                                // outComesLevelOther: defaultValues?.participation.outComesLevelOther ?? undefined,
                            }
                        }
                    />
                    <HorizontalRule />
                    <DetailsInformationFieldset
                        readOnly={readOnly}
                        defaultValues={
                            {
                                // detailsIsFormal: defaultValues.participation.detailsIsFormal ?? undefined,
                                // detailsGroupFormation: defaultValues.participation.detailsGroupFormation ?? undefined,
                                // detailsTotalClassHours: defaultValues.participation.detailsTotalClassHours ?? undefined,
                                // detailsCertificateWillBeAwarded:
                                //     defaultValues.participation.detailsCertificateWillBeAwarded ?? undefined,
                                // detailsStartDate: `${defaultValues.participation.detailsStartDate}` ?? undefined,
                                // detailsEndDate: `${defaultValues.participation.detailsEndDate}` ?? undefined,
                                // detailsEngagements: defaultValues.participation.detailsEngagements ?? undefined,
                            }
                        }
                    />
                </Column>
            </>
        )
    }
}
