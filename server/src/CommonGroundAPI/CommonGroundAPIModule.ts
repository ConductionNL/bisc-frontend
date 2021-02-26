import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
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
