import { LearningNeed, Maybe } from 'api/types/types'
import { PostPutLearningNeedParams } from 'api/learningNeed/learningNeed'
import { ParticipantLearningNeedFieldsFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'

export function participantLearningNeedFieldsMapper(
    studentId: string,
    formData: ParticipantLearningNeedFieldsFormModel,
    defaultLearningNeed?: LearningNeed
): PostPutLearningNeedParams {
    const postLearningNeedParams: PostPutLearningNeedParams = {
        student: studentId,
        description: formData.description,
        motivation: formData.motivation,
        advisedOffer: 'test',
        desiredOffer: 'test',
        offerDifference: 'NO', // NO, YES_NOT_OFFERED_IN_TRAVEL_RANGE, YES_QUEUE, YES_OTHER
        // studentId: studentId,
        // learningNeedMotivation: formData.motivations,
        // learningNeedDescription: formData.decription,
        // desiredOutComesGoal: formData.outComesGoal,
        // desiredOutComesTopic: formData.outComesTopic,
        // desiredOutComesTopicOther: formData.outComesTopic,
        // desiredOutComesApplication: formData.outComesApplication,
        // desiredOutComesApplicationOther: formData.outComesApplicationOther,
        // desiredOutComesLevel: formData.outComesLevel,
        // desiredOutComesLevelOther: formData.outComesLevelOther,
        // offerDesiredOffer: formData.offerDesiredOffer,
        // offerAdvisedOffer: formData.offerAdvisedOffer,
        // offerDifference: formData.offerDifference,
        // offerDifferenceOther: formData.offerDifferenceOther,
        // offerEngagements: formData.offerEngagements,
    }

    return postLearningNeedParams

    function getBooleanValueByCheckboxValue(checkboxValue?: Maybe<'YES' | 'NO'>) {
        if (checkboxValue) {
            if (checkboxValue === 'YES') {
                return true
            }

            if (checkboxValue === 'NO') {
                return false
            }
        }
    }

    function getNumberValueByInputValue(inputValue?: Maybe<string>) {
        if (typeof inputValue === 'string' && inputValue !== '') {
            return +inputValue
        }
    }
}
