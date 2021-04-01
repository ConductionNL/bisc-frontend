import { Injectable } from '@nestjs/common'
import { UserRoleEnum } from 'src/CommonGroundAPI/uc/GroupRepository'
import { ContextUser, UserEnvironmentEnum } from 'src/User/entities/UserEntity'

@Injectable()
export class TaalhuisPolicyService {
    public canCreate(contextUser: ContextUser) {
        if (contextUser.userEnvironment === UserEnvironmentEnum.BISC) {
            return true
        }
        return false
    }

    public canUpdate(contextUser: ContextUser, taalhuisId: string) {
        // Only taalhuis coordinator can update
        const userRolesNames = contextUser.userRoles.map(userRole => userRole.name)
        if (
            contextUser.userEnvironment === UserEnvironmentEnum.TAALHUIS &&
            userRolesNames.includes(UserRoleEnum.TAALHUIS_COORDINATOR) &&
            taalhuisId === contextUser.organizationId
        ) {
            return true
        }

        return this.canCreate(contextUser)
    }

    public canDelete(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }

    public canList(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }

    public canView(contextUser: ContextUser, taalhuisId: string) {
        // Any taalhuis role can view
        if (contextUser.userEnvironment === UserEnvironmentEnum.TAALHUIS && taalhuisId === contextUser.organizationId) {
            return true
        }

        return this.canCreate(contextUser)
    }
}
