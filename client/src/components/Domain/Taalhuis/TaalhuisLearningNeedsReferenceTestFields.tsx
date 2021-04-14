import { useLingui } from '@lingui/react'
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

export const TaalhuisParticipantLearningNeedReferenceTestFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
    const { i18n } = useLingui()

    return (
        <Column>
            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={defaultValues?.learningOutcome}
                fieldControls={{
                    goal: {
                        required: true,
                    },
                    topic: {
                        required: true,
                    },
                    application: {
                        required: true,
                    },
                    level: {
                        required: true,
                    },
                }}
            />
            <HorizontalRule />
            <TestInformationFieldset readOnly={readOnly} defaultValues={defaultValues?.tests} />
        </Column>
    )
}
