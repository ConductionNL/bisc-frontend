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
import { LearningNeedsDetails } from 'views/Authorized/Participants/taalhuis/Participants/Detail/LearningNeeds/mocks/learningNeeds'
import OfferInformationFieldset, {
    OfferInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'

export interface TaalhuisParticipantLearningNeedFieldsFormModel
    extends OfferInformationFieldsetModel,
        LearningOutcomeOfferFieldsetModel,
        LearningQuestionsFieldsetModel {}

interface Props {
    learningNeed?: LearningNeedsDetails
    readOnly?: boolean
}

export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({ learningNeed, readOnly }) => {
    return (
        <Column>
            <LearningQuestionsFieldset readOnly={readOnly} defaultValues={learningNeed?.data} />
            <HorizontalRule />

            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={{
                    outComesGoal: learningNeed?.data.desiredOutComesGoal,
                    outComesTopic: learningNeed?.data.desiredOutComesTopic,
                    outComesTopicOther: learningNeed?.data.desiredOutComesTopicOther ?? undefined,
                    outComesApplication: learningNeed?.data.desiredOutComesApplication,
                    outComesApplicationOther: learningNeed?.data.desiredOutComesApplicationOther ?? undefined,
                    outComesLevel: learningNeed?.data.desiredOutComesLevel,
                    outComesLevelOther: learningNeed?.data.desiredOutComesLevelOther ?? undefined,
                }}
            />
            <HorizontalRule />
            {!readOnly && (
                <OfferInformationFieldset
                    defaultValues={{
                        offerDesiredOffer: learningNeed?.data.offerDesiredOffer ?? undefined,
                        offerAdvisedOffer: learningNeed?.data.offerAdvisedOffer ?? undefined,
                        offerDifference: learningNeed?.data.offerDifference ?? undefined,
                        offerDifferenceOther: learningNeed?.data.offerDifferenceOther ?? undefined,
                        offerEngagements: learningNeed?.data.offerDifferenceOther ?? undefined,
                    }}
                />
            )}
        </Column>
    )
}
