import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { LearningQuestionsFieldset } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import React from 'react'
import { AanbiederParticipantGoal } from 'views/Authorized/Supplier/AanbiederView/mocks'
import { DesiredOutcomesFieldset } from '../../../../fieldsets/participants/fieldsets/DesiredOutcomesFieldset'

interface Props {
    participantGoal: AanbiederParticipantGoal
}

export const AanbiederParticipantGoalDetailFields: React.FunctionComponent<Props> = ({ participantGoal }) => {
    const { learningQuestion } = participantGoal

    return (
        <>
            <LearningQuestionsFieldset defaultValues={learningQuestion} readOnly={true} />
            <HorizontalRule />
            <DesiredOutcomesFieldset
                // TODO: add back when the right typing is available + call is implemented
                // defaultValues={{
                //     goal: participantGoal.desiredOutcome.,
                //     topic: prefillData.outComesTopic,
                //     topicOther: prefillData.outComesTopicOther ?? undefined,
                //     application: prefillData.outComesApplication ?? undefined,
                //     applicationOther: prefillData.outComesApplicationOther ?? undefined,
                //     level: prefillData.outComesLevel,
                //     levelOther: prefillData.outComesLevelOther ?? undefined,
                // }}
                readOnly={true}
            />
            <HorizontalRule />
            {/* TODO: add reference fieldset */}
        </>
    )
}
