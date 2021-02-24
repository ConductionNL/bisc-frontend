import { Module } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'
import { EmailRepository } from 'src/Email/EmailRepository'
import { CommonGroundAPIService } from './CommonGroundAPIService'
import { CommonGroundLoginService } from './CommonGroundLoginService'

@Module({
    providers: [CommonGroundAPIService, CommonGroundLoginService, AddressRepository, EmailRepository],
    exports: [CommonGroundAPIService, CommonGroundLoginService, AddressRepository, EmailRepository],
    imports: [],
})
export class CommonGroundAPIModule {}
