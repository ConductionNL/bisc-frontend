import { PostPutLearningNeedParams, PostPutLearningResultParams } from 'api/learningNeed/learningNeed'
import { LearningNeed } from 'api/types/types'
import { ParticipantLearningNeedFieldsFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'

export function participantLearningNeedFieldsMapper(
    studentId: string,
    formData: ParticipantLearningNeedFieldsFormModel,
    defaultLearningNeed?: LearningNeed
): PostPutLearningNeedParams {
    const learningResults: PostPutLearningResultParams[] = [
        {
            id: defaultLearningNeed ? defaultLearningNeed?.learningResults?.[0]?.id : undefined,
            verb: formData['learningResults[0].verb'],
            subject: formData['learningResults[0].subject'],
            subjectOther: formData['learningResults[0].subjectOther'],
            application: formData['learningResults[0].application'],
            applicationOther: formData['learningResults[0].applicationOther'],
            level: formData['learningResults[0].level'],
            levelOther: formData['learningResults[0].levelOther'],
        },
    ]

    const postLearningNeedParams: PostPutLearningNeedParams = {
        id: defaultLearningNeed ? defaultLearningNeed.id : undefined,
        student: defaultLearningNeed ? undefined : studentId,
        description: formData.description,
        motivation: formData.motivation,
        learningResults: learningResults,
        advisedOffer: formData.advisedOffer,
        desiredOffer: formData.desiredOffer,
        offerDifference: formData.offerDifference,
        offerDifferenceOther: formData.offerDifferenceOther,
        agreements: formData.agreements,
    }

    return postLearningNeedParams
}
