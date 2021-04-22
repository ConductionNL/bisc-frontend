import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import React from 'react'
import { AanbiederParticipantGoal } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    participantGoal: AanbiederParticipantGoal
}

export const AanbiederParticipantGoalDetailFields: React.FunctionComponent<Props> = ({ participantGoal }) => {
    const { learningNeedData } = participantGoal

    return (
        <>
            <LearningQuestionsFieldset defaultValues={learningNeedData} readOnly={true} />
            <HorizontalRule />
            <LearningOutcomeOfferFieldset defaultValues={{}} readOnly={true} />
            <HorizontalRule />
            {/* TODO: add reference fieldset */}
        </>
    )
}
