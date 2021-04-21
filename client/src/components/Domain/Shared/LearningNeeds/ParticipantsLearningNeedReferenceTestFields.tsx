import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningOutcomeOfferFieldset'
import TestInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import React from 'react'
import { LearningNeedsReferenceDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'

interface Props {
    defaultValues?: LearningNeedsReferenceDetails
    readOnly?: boolean
}

export const ParticipantsLearningNeedReferenceTestFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
    return (
        <Column>
            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={defaultValues?.learningOutcome}
                fieldControls={{
                    outComesGoal: {
                        required: true,
                    },
                    outComesTopic: {
                        required: true,
                    },
                    outComesApplication: {
                        required: true,
                    },
                    outComesLevel: {
                        required: true,
                    },
                }}
            />
            <HorizontalRule />
            <TestInformationFieldset readOnly={readOnly} defaultValues={defaultValues?.tests} />
        </Column>
    )
}
