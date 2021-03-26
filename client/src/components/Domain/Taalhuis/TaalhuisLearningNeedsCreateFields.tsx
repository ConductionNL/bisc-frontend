import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomesFieldset } from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import OfferInfortmationInformationFieldset from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import React from 'react'

interface Props {}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({}) => {
    const { i18n } = useLingui()

    return (
        <Column>
            {renderLearningNeedsFields()}
            <HorizontalRule />
            {renderDesiredOutcomeFields()}
            <HorizontalRule />
            {renderOfferInformationFields()}
        </Column>
    )

    function renderLearningNeedsFields() {
        return <LearningQuestionsFieldset />
    }

    function renderDesiredOutcomeFields() {
        return <DesiredOutcomesFieldset />
    }

    function renderOfferInformationFields() {
        return <OfferInfortmationInformationFieldset />
    }
}
