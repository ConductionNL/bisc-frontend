import { LearningNeed, Maybe } from 'api/types/types'
import { PostPutLearningNeedParams, PostPutLearningResultParams } from 'api/learningNeed/learningNeed'
import { ParticipantLearningNeedFieldsFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'

export function participantLearningNeedFieldsMapper(
    studentId: string,
    formData: ParticipantLearningNeedFieldsFormModel,
    defaultLearningNeed?: LearningNeed
): PostPutLearningNeedParams {
    const learningResults: PostPutLearningResultParams[] = [
        {
            id: defaultLearningNeed ? defaultLearningNeed?.learningResults?.[0]?.id : undefined,
            verb: formData['learningResult[0].verb'],
            subject: formData['learningResult[0].subject'],
            subjectOther: formData['learningResult[0].subjectOther'],
            application: formData['learningResult[0].application'],
            applicationOther: formData['learningResult[0].applicationOther'],
            level: formData['learningResult[0].level'],
            levelOther: formData['learningResult[0].levelOther'],
        },
    ]

    const postLearningNeedParams: PostPutLearningNeedParams = {
        id: defaultLearningNeed ? defaultLearningNeed.id : undefined,
        student: defaultLearningNeed ? undefined : studentId,
        description: formData.description,
        motivation: formData.motivation,
        advisedOffer: 'test',
        desiredOffer: 'test',
        offerDifference: 'NO', // NO, YES_NOT_OFFERED_IN_TRAVEL_RANGE, YES_QUEUE, YES_OTHER
        learningResults: learningResults,

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
