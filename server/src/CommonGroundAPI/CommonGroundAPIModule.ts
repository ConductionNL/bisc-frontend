import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'
import { ParticipantRepository } from './edu/ParticipantRepository'
import { ProgramRepository } from './edu/ProgramRepository'
import { EmployeeRepository } from './mrc/EmployeeRepository'
import { SourceTaalhuisRepository } from './wrc/SourceTaalhuisRepository'

@Module({
    providers: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        SourceTaalhuisRepository,
        ParticipantRepository,
        ProgramRepository,
    ],
    exports: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        SourceTaalhuisRepository,
        ParticipantRepository,
        ProgramRepository,
    ],
    imports: [],
})
export class CommonGroundAPIModule {}
