import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { UserModule } from 'src/User/UserModule'
import { CreateTaalhuisEmployeeService } from './CreateTaalhuisEmployeeService'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { DeleteTaalhuisService } from './DeleteTaalhuisService'
import { TaalhuisEmployeeResolver } from './TaalhuisEmployeeResolver'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'
import { TaalhuisResolver } from './TaalhuisResolver'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'
import { UserRoleResolver } from './UserRoleResolver'

@Module({
    imports: [CommonGroundAPIModule, UserModule],
    providers: [
        CreateTaalhuisService,
        TaalhuisResolver,
        UpdateTaalhuisService,
        UserRoleResolver,
        CreateTaalhuisEmployeeService,
        TaalhuisEmployeeResolver,
        DeleteTaalhuisService,
        TaalhuisEmployeeService,
    ],
    exports: [],
})
export class TaalhuisModule {}
