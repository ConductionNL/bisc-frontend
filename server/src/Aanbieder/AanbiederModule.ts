import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { UserModule } from 'src/User/UserModule'
import { AanbiederEmployeeResolver } from './AanbiederEmployeeResolver'
import { AanbiederEmployeeService } from './AanbiederEmployeeService'
import { AanbiederResolver } from './AanbiederResolver'
import { AanbiederUserRoleResolver } from './AanbiederUserRoleResolver'
import { CreateAanbiederEmployeeService } from './CreateAanbiederEmployeeService'
import { CreateAanbiederService } from './CreateAanbiederService'
import { DeleteAanbiederService } from './DeleteAanbiederService'
import { UpdateAanbiederService } from './UpdateAanbiederService'

@Module({
    imports: [CommonGroundAPIModule, UserModule],
    providers: [
        AanbiederResolver,
        CreateAanbiederService,
        DeleteAanbiederService,
        UpdateAanbiederService,
        AanbiederEmployeeResolver,
        AanbiederEmployeeService,
        AanbiederUserRoleResolver,
        CreateAanbiederEmployeeService,
    ],
})
export class AanbiederModule {}
