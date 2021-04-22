import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    DesiredOutcomesFieldset,
    DesiredOutcomesFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import {
    LearningQuestionsFieldset,
    LearningQuestionsFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import OfferInfortmationInformationFieldset, {
    OfferInfortmationInformationModel,
} from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import React from 'react'
import { LearningNeedsDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'

export interface TaalhuisParticipantLearningNeedFieldsFormModel
    extends OfferInfortmationInformationModel,
        DesiredOutcomesFieldsetModel,
        LearningQuestionsFieldsetModel {}

interface Props {
    learningNeed?: LearningNeedsDetails
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({ learningNeed, readOnly }) => {
    return (
        <Column>
            <LearningQuestionsFieldset readOnly={readOnly} defaultValues={learningNeed?.learningQuestion} />
            <HorizontalRule />
            <DesiredOutcomesFieldset
                readOnly={readOnly}
                // TODO: add dback when real types are available
                // defaultValues={learningNeed?.desiredOutcome}
            />
            <HorizontalRule />
            {!readOnly && <OfferInfortmationInformationFieldset defaultValues={learningNeed?.learningQuestion} />}
        </Column>
    )
}
