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
import { LearningNeedQuery } from 'generated/graphql'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedTopicEnum,
} from 'generated/enums'
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
    const { i18n } = useLingui()

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
                defaultValues={{
                    'learningResult[0].verb': learningResult?.verb,
                    'learningResult[0].subject': learningResult?.subject,
                    'learningResult[0].subjectOther': learningResult?.subjectOther,
                    'learningResult[0].application': learningResult?.application,
                    'learningResult[0].applicationOther': learningResult?.applicationOther,
                    'learningResult[0].level': learningResult?.level,
                    'learningResult[0].levelOther': learningResult?.levelOther,
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
