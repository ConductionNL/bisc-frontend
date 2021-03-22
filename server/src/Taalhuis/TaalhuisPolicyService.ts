import { Injectable } from '@nestjs/common'
import { ContextUser, UserEnvironmentEnum } from 'src/User/entities/UserEntity'

@Injectable()
export class TaalhuisPolicyService {
    public canCreate(contextUser: ContextUser) {
        if (contextUser.userEnvironment === UserEnvironmentEnum.BISC) {
            return true
        }
        return false
    }

    public canUpdate(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }

    public canDelete(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }

    public canList(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }

    public canView(contextUser: ContextUser) {
        return this.canCreate(contextUser)
    }
}
