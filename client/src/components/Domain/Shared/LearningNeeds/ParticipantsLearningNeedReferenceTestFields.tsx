import { useLingui } from '@lingui/react'
import { TestResult } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import LearningOutcomeOfferFieldset, {
    LearningOutcomeOfferFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import TestInformationFieldset, {
    TestInformationFieldsetModel,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
import React from 'react'

interface Props {
    defaultValues?: TestResult
    readOnly?: boolean
}

export type ParticipantsLearningNeedReferenceTestFieldsModel = LearningOutcomeOfferFieldsetModel &
    TestInformationFieldsetModel

export const ParticipantsLearningNeedReferenceTestFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
    const { i18n } = useLingui()

    return (
        <Column>
            <LearningOutcomeOfferFieldset
                sectionTitle={i18n._('Leeruitkomst')}
                readOnly={readOnly}
                allRequired={true}
                defaultValues={defaultValues?.learningNeedOutCome}
                errorPath={{
                    verb: 'learningNeedOutCome.verb',
                    subject: 'learningNeedOutCome.subject',
                    subjectOther: 'learningNeedOutCome.subjectOther',
                    application: 'learningNeedOutCome.application',
                    applicationOther: 'learningNeedOutCome.applicationOther',
                    level: 'learningNeedOutCome.level',
                    levelOther: 'learningNeedOutCome.levelOther',
                }}
            />
            <HorizontalRule />
            <TestInformationFieldset readOnly={readOnly} defaultValues={defaultValues} />
        </Column>
    )
}
