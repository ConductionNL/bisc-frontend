import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { PersonRepository } from './cc/PersonRepository'
import { OrganizationRepository } from './cc/OrganizationRepository'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'
import { EmployeeRepository } from './mrc/EmployeeRepository'
import { UserRepository } from './uc/UserRepository'
import { ParticipantRepository } from './edu/ParticipantRepository'
import { ProgramRepository } from './edu/ProgramRepository'
import { GroupRepository } from './uc/GroupRepository'
import { SourceOrganizationRepository } from './wrc/SourceOrganizationRepository'
import { MemoRepository } from './memo/MemoRepository'

@Module({
    providers: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        UserRepository,
        SourceOrganizationRepository,
        ParticipantRepository,
        ProgramRepository,
        OrganizationRepository,
        PersonRepository,
        GroupRepository,
        MemoRepository,
    ],
    exports: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
        EmployeeRepository,
        UserRepository,
        SourceOrganizationRepository,
        ParticipantRepository,
        ProgramRepository,
        OrganizationRepository,
        PersonRepository,
        GroupRepository,
        MemoRepository,
    ],
    imports: [],
})
export class CommonGroundAPIModule {}
