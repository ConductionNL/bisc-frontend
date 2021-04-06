import { Injectable } from '@nestjs/common'
import { ContextUser, UserEnvironmentEnum } from 'src/User/entities/UserEntity'
import { AanbiederEmployeeEntity } from './AanbiederEmployeeService'

@Injectable()
export class AanbiederEmployeePolicyService {
    public canCreateForAanbieder(contextUser: ContextUser, aanbiederId: string) {
        if (contextUser.userEnvironment === UserEnvironmentEnum.BISC) {
            return true
        }

        // TODO: Add userRole check when userRoles have enum
        if (
            contextUser.userEnvironment === UserEnvironmentEnum.AANBIEDER &&
            contextUser.organizationId === aanbiederId
        ) {
            return true
        }

        return false
    }

    public canListForAanbieder(contextUser: ContextUser, aanbiederId: string) {
        return this.canCreateForAanbieder(contextUser, aanbiederId)
    }

    public canView(contextUser: ContextUser, aanbiederEmployee: AanbiederEmployeeEntity) {
        if (contextUser.userEnvironment === UserEnvironmentEnum.BISC) {
            return true
        }

        if (
            contextUser.userEnvironment === UserEnvironmentEnum.AANBIEDER &&
            contextUser.organizationId === aanbiederEmployee.aanbieder.id
        ) {
            return true
        }

        return false
    }

    public canUpdate(contextUser: ContextUser, aanbiederEmployee: AanbiederEmployeeEntity) {
        return this.canCreateForAanbieder(contextUser, aanbiederEmployee.aanbieder.id)
    }

    public canDelete(contextUser: ContextUser, aanbiederEmployee: AanbiederEmployeeEntity) {
        return this.canCreateForAanbieder(contextUser, aanbiederEmployee.aanbieder.id)
    }
}
