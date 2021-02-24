import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'
import { EmailRepository } from 'src/Email/EmailRepository'
import { TelephoneRepository } from 'src/Email/TelephoneRepository'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'

@Module({
    providers: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
    ],
    exports: [
        CommonGroundAPIService,
        CommonGroundLoginService,
        AddressRepository,
        EmailRepository,
        TelephoneRepository,
    ],
    imports: [],
})
export class CommonGroundAPIModule {}
