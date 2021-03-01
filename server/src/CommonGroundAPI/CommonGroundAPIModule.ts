import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'
import { EmployeeRepository } from './mrc/EmployeeRepository'
import { UserRepository } from './uc/UserRepository'

@Module({
    providers: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        UserRepository,
    ],
    exports: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        UserRepository,
    ],
    imports: [],
})
export class CommonGroundAPIModule {}
