import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import {
    LearningQuestionsFieldset,
    LearningQuestionsFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
import LearningOutcomeOfferFieldset, {
    LearningOutcomeOfferFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
import React from 'react'
import OfferInformationFieldset, {
    OfferInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
import { LearningNeed } from 'api/types/types'

export interface ParticipantLearningNeedFieldsFormModel
    extends OfferInformationFieldsetModel,
        LearningOutcomeOfferFieldsetModel,
        LearningQuestionsFieldsetModel {}

interface Props {
    learningNeed?: LearningNeed
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = props => {
    const { learningNeed, readOnly } = props
    const learningResult = learningNeed?.learningResults?.[0]

    return (
        <Column>
            <LearningQuestionsFieldset
                readOnly={readOnly}
                defaultValues={{
                    description: learningNeed?.description,
                    motivation: learningNeed?.motivation,
                }}
            />
            <HorizontalRule />
            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={learningResult}
                errorPath={{
                    verb: 'learningResults[0].verb',
                    subject: 'learningResults[0].subject',
                    subjectOther: 'learningResults[0].subjectOther',
                    application: 'learningResults[0].application',
                    applicationOther: 'learningResults[0].applicationOther',
                    level: 'learningResults[0].level',
                    levelOther: 'learningResults[0].levelOther',
                }}
            />
            <HorizontalRule />
            <OfferInformationFieldset
                readOnly={readOnly}
                defaultValues={{
                    advisedOffer: learningNeed?.advisedOffer,
                    desiredOffer: learningNeed?.desiredOffer,
                    offerDifference: learningNeed?.offerDifference,
                    offerDifferenceOther: learningNeed?.offerDifferenceOther,
                    agreements: learningNeed?.agreements,
                }}
            />
        </Column>
    )
}
