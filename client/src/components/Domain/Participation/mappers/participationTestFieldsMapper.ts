import { PostPutTestResultParams } from 'api/participation/participationTestResults'
import { ParticipantsLearningNeedReferenceTestFieldsModel } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'

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
            subject: form.subject,
            subjectOther: form.subjectOther,
            application: form.application,
            applicationOther: form.applicationOther,
            level: form.level,
            levelOther: form.levelOther,
        },
    }
}
