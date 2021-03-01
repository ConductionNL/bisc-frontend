import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { PersonModule } from 'src/Person/PersonModule'
import { ProgramModule } from 'src/Program/ProgramModule'
import { UserModule } from 'src/User/UserModule'
import { CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'

import { CreateTaalhuisService } from './CreateTaalhuisService'
import { GroupRepository } from './GroupRepository'
import { SourceTaalhuisRepository } from './SourceTaalhuisRepository'
import { TaalhuisEmployeeResolver } from './TaalhuisEmployeeResolver'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'
import { UserRoleResolver } from './UserRoleResolver'

@Module({
    imports: [CommonGroundAPIModule, ProgramModule, UserModule, PersonModule],
    providers: [
        CreateTaalhuisService,
        TaalhuisResolver,
        TaalhuisRepository,
        SourceTaalhuisRepository,
        GroupRepository,
        UserRoleResolver,
        CreateTaalhuisEmployeeService,
        TaalhuisEmployeeResolver,
    ],
    exports: [TaalhuisRepository],
})
export class TaalhuisModule {}
