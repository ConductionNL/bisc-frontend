import React, { useState } from 'react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import SupplierInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/SupplierInformationFieldset'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
// import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import OfferInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/OfferInformationFieldset'
import DetailsInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import { Participation, ParticipationProviderOption } from 'api/types/types'
import { PostPutParticipationParams } from 'api/participation/participation'

interface Props {
    defaultValues?: Participation
    readOnly?: boolean
}

export interface LearningNeedsReferenceFormModel
    extends Omit<PostPutParticipationParams, 'learningNeed' | 'providerOption' | 'degree'> {
    degree: 'true' | 'false'
}

export const TaalhuisLearningNeedsReferenceFields: React.FC<Props> = props => {
    const { readOnly, defaultValues } = props
    const { i18n } = useLingui()
    const [showCustomFields, setShowCustomFields] = useState(
        defaultValues?.providerOption === ParticipationProviderOption.Other
    )

    return (
        <Column>
            <SupplierInformationFieldset
                readOnly={readOnly}
                onSupplierChange={hasSelectedOther => setShowCustomFields(hasSelectedOther)}
                defaultValues={{
                    provider: defaultValues?.provider?.id,
                    explanation: defaultValues?.explanation,
                    providerOther: defaultValues?.providerOther,
                }}
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
                        defaultValues={{
                            offerName: defaultValues?.offerName,
                            offerType: defaultValues?.offerType,
                        }}
                    />
                    {/* <HorizontalRule />
                    <LearningOutcomeOfferFieldset
                        sectionTitle={i18n._('Leeruitkomst aanbod')}
                        readOnly={readOnly}
                        defaultValues={
                            {
                                // outComesGoal: defaultValues?.outComesGoal ?? undefined,
                                // outComesTopic: defaultValues?.outComesTopic ?? undefined,
                                // outComesTopicOther: defaultValues?.outComesTopicOther ?? undefined,
                                // outComesApplication: defaultValues?.outComesApplication ?? undefined,
                                // outComesApplicationOther: defaultValues?.outComesApplicationOther ?? undefined,
                                // outComesLevel: defaultValues?.outComesLevel ?? undefined,
                                // outComesLevelOther: defaultValues?.outComesLevelOther ?? undefined,
                            }
                        }
                    /> */}
                    <HorizontalRule />
                    <DetailsInformationFieldset
                        readOnly={readOnly}
                        defaultValues={{
                            formality: defaultValues?.formality,
                            groupFormation: defaultValues?.groupFormation,
                            start: defaultValues?.start,
                            end: defaultValues?.end,
                            agreement: defaultValues?.agreement,
                            degree: defaultValues?.degree,
                            // detailsTotalClassHours: defaultValues?.participation.detailsTotalClassHours,
                        }}
                    />
                </Column>
            </>
        )
    }
}
