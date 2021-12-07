import { PostPutTestResultParams } from 'api/participation/participationTestResults'
import { Participation, TestResult } from 'api/types/types'
import { ParticipantsLearningNeedReferenceTestFieldsModel } from 'components/Domain/Shared/LearningNeeds/ParticipantsLearningNeedReferenceTestFields'

export function getMappedParticipationTestFields(
    form: ParticipantsLearningNeedReferenceTestFieldsModel,
    participation: Participation,
    defaultTestResult?: TestResult
): PostPutTestResultParams {
    return {
        id: defaultTestResult?.id,
        participation: participation.id,
        usedExam: form.usedExam,
        examDate: form.examDate,
        memo: form.memo,
        learningNeedOutCome: {
            learningNeed: participation.learningNeed.id,
            verb: form.verb ?? undefined,
            subject: form.subject ?? undefined,
            subjectOther: form.subjectOther ?? undefined,
            application: form.application ?? undefined,
            applicationOther: form.applicationOther ?? undefined,
            level: form.level ?? undefined,
            levelOther: form.levelOther ?? undefined,
        },
    }
}
