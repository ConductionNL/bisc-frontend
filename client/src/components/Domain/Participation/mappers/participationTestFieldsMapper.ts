import { PostPutTestResultParams } from 'api/participation/participationTestResults'
import { ParticipantsLearningNeedReferenceTestFieldsModel } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'
import { Forms } from 'utils/forms'

interface Args {
    form: ParticipantsLearningNeedReferenceTestFieldsModel
    participationId: string
    learningNeedId: string
    defaultTestResultId?: string
}

export function getMappedParticipationTestFields(args: Args): PostPutTestResultParams {
    const { form, participationId, learningNeedId, defaultTestResultId } = args

    return {
        id: defaultTestResultId,
        participation: participationId,
        usedExam: form.usedExam,
        examDate: form.examDate,
        memo: form.memo,
        learningNeedOutCome: {
            learningNeed: learningNeedId,
            verb: form.verb,
            subject: Forms.getNullableFieldValue('subject', form),
            subjectOther: form.subjectOther,
            application: Forms.getNullableFieldValue('application', form),
            applicationOther: form.applicationOther,
            level: Forms.getNullableFieldValue('level', form),
            levelOther: form.levelOther,
        },
    }
}
