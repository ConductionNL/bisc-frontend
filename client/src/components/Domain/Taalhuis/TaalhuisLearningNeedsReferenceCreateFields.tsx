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
            <SupplierInformationFieldset readOnly={readOnly} defaultValues={defaultValues?.supplier} />
            <HorizontalRule />
            <Column spacing={8}>
                <div>
                    <SectionTitle title={'Aanvullende informatie deelname'} heading={'H3'} />
                    <Paragraph>{i18n._(t`Invullen indien bekend`)}</Paragraph>
                </div>
                <OfferInformationFieldset readOnly={readOnly} defaultValues={defaultValues?.offer} />
                <HorizontalRule />
                <LearningOutcomeOfferFieldset readOnly={readOnly} defaultValues={defaultValues?.learningOutcome} />
                <HorizontalRule />
                <DetailsInformationFieldset readOnly={readOnly} defaultValues={defaultValues?.details} />
            </Column>
        </Column>
    )
}
