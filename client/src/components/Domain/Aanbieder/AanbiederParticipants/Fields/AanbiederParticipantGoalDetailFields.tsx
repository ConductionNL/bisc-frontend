import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import LearningOutcomeOfferFieldset, {
    LearningOutComeOfferDefaultValues,
} from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import {
    LearningQuestionsDefaultValues,
    LearningQuestionsFieldset,
} from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import React from 'react'

interface Props {
    participantGoal: participantGoalsDefaultValues
}

interface participantGoalsDefaultValues extends LearningOutComeOfferDefaultValues, LearningQuestionsDefaultValues {}

export const AanbiederParticipantGoalDetailFields: React.FunctionComponent<Props> = ({ participantGoal }) => {
    return (
        <>
            <LearningQuestionsFieldset defaultValues={participantGoal} readOnly={true} />
            <HorizontalRule />
            <LearningOutcomeOfferFieldset defaultValues={participantGoal} readOnly={true} />
            <HorizontalRule />
            {/* TODO: add reference fieldset */}
        </>
    )
}
