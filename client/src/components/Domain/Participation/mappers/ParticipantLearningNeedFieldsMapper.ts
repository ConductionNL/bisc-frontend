import { PostPutLearningNeedParams, PostPutLearningResultParams } from 'api/learningNeed/learningNeed'
import { LearningNeed } from 'api/types/types'
import { ParticipantLearningNeedFieldsFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsCreateFields'
import { Forms } from 'utils/forms'

export function participantLearningNeedFieldsMapper(
    studentId: string,
    formData: ParticipantLearningNeedFieldsFormModel,
    defaultLearningNeed?: LearningNeed
): PostPutLearningNeedParams {
    const learningResults: PostPutLearningResultParams[] = [
        {
            id: defaultLearningNeed ? defaultLearningNeed?.learningResults?.[0]?.id : undefined,
            verb: formData.verb,
            subject: Forms.getNullableFieldValue('subject', formData),
            subjectOther: formData.subjectOther,
            application: Forms.getNullableFieldValue('application', formData),
            applicationOther: formData.applicationOther,
            level: Forms.getNullableFieldValue('level', formData),
            levelOther: formData.levelOther,
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
        offerDifference: Forms.getNullableFieldValue('offerDifference', formData),
        offerDifferenceOther: formData.offerDifferenceOther,
        agreements: formData.agreements,
    }

    return postLearningNeedParams
}
