import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import { DesiredOutcomesFieldset } from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import OfferInfortmationInformationFieldset from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import React from 'react'
import { LearningNeedsDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'

interface Props {
    learningNeed?: LearningNeedsDetails
}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({ learningNeed }) => {
    return (
        <Column>
            <LearningQuestionsFieldset defaultValues={learningNeed?.learningQuestion} />
            <HorizontalRule />
            <DesiredOutcomesFieldset defaultValues={learningNeed?.desiredOutcome} />
            <HorizontalRule />
            <OfferInfortmationInformationFieldset defaultValues={learningNeed?.learningQuestion} />
        </Column>
    )
}
