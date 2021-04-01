import { Injectable } from '@nestjs/common'
import { StudentPolicyService } from 'src/Student/services/StudentPolicyService'
import { StudentEntity } from 'src/Student/services/StudentService'
import { ContextUser, UserEnvironmentEnum } from 'src/User/entities/UserEntity'

@Injectable()
export class LearningNeedPolicyService {
    public constructor(private studentPolicyService: StudentPolicyService) {}

    public canCreateForStudent(contextUser: ContextUser, student: StudentEntity) {
        const canViewStudent = this.studentPolicyService.canView(contextUser, student)

        if (contextUser.userEnvironment === UserEnvironmentEnum.TAALHUIS && canViewStudent === true) {
            return true
        }

        return false
    }

    public canListForStudent(contextUser: ContextUser, student: StudentEntity) {
        const canViewStudent = this.studentPolicyService.canView(contextUser, student)

        if (contextUser.userEnvironment === UserEnvironmentEnum.TAALHUIS && canViewStudent === true) {
            return true
        }

        if (contextUser.userEnvironment === UserEnvironmentEnum.AANBIEDER && canViewStudent === true) {
            return true
        }

        return false
    }
}
