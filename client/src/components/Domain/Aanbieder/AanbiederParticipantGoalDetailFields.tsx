import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import React from 'react'
import { AanbiederParticipantGoal } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    participantGoal: AanbiederParticipantGoal
}

// TODO
export const AanbiederParticipantGoalDetailFields: React.FunctionComponent<Props> = ({ participantGoal }) => {
    return (
        <>
            <LearningQuestionsFieldset defaultValues={participantGoal.learningQuestion} readOnly={true} />
            <HorizontalRule />
            {/* desired outcome fields */}
        </>
    )
}
