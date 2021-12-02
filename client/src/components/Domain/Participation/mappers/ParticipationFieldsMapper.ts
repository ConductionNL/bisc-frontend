import { PostPutParticipationParams } from 'api/participation/participation'
import { Participation } from 'api/types/types'
import { LearningNeedsReferenceFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceFields'

export function getMappedParticipationFormFields(
    form: LearningNeedsReferenceFormModel,
    learningNeed: string,
    defaultParticipation?: Participation
): PostPutParticipationParams {
    return {
        id: defaultParticipation?.id,
        learningNeed,
    }
}
