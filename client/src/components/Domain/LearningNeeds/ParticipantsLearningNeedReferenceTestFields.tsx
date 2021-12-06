import { TestResult } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import TestInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import React from 'react'

interface Props {
    defaultValues?: TestResult
    readOnly?: boolean
}

export const ParticipantsLearningNeedReferenceTestFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
    return (
        <Column>
            {/* TODO: update paths */}
            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={{
                    'learningResults[0].verb': defaultValues?.learningNeedOutCome.verb,
                    'learningResults[0].subject': defaultValues?.learningNeedOutCome.subject,
                    'learningResults[0].subjectOther': defaultValues?.learningNeedOutCome.subjectOther,
                    'learningResults[0].application': defaultValues?.learningNeedOutCome.application,
                    'learningResults[0].applicationOther': defaultValues?.learningNeedOutCome.applicationOther,
                    'learningResults[0].level': defaultValues?.learningNeedOutCome.level,
                    'learningResults[0].levelOther': defaultValues?.learningNeedOutCome.levelOther,
                }}
            />
            <HorizontalRule />
            <TestInformationFieldset readOnly={readOnly} defaultValues={defaultValues} />
        </Column>
    )
}
