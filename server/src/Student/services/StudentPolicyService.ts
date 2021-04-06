import { Injectable } from '@nestjs/common'
import { ContextUser, UserEnvironmentEnum } from 'src/User/entities/UserEntity'
import { StudentEntity } from './StudentService'

@Injectable()
export class StudentPolicyService {
    public canCreateForTaalhuis(contextUser: ContextUser, taalhuisId: string) {
        if (contextUser.userEnvironment === UserEnvironmentEnum.TAALHUIS && taalhuisId === contextUser.organizationId) {
            return true
        }

        return false
    }

    public canListForTaalhuis(contextUser: ContextUser, taalhuisId: string) {
        return this.canCreateForTaalhuis(contextUser, taalhuisId)
    }

    public canView(contextUser: ContextUser, student: StudentEntity) {
        // TODO: Add support for Aanbieder users
        return this.canListForTaalhuis(contextUser, student.taalhuis.id)
    }
}
