import { Module } from '@nestjs/common'
import { AddressModule } from 'src/Address/AddressModule'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { EmailModule } from 'src/Email/EmailModule'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { SourceTaalhuisRepository } from './SourceTaalhuisRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    imports: [AddressModule, CommonGroundAPIModule, EmailModule],
    providers: [CreateTaalhuisService, TaalhuisResolver, TaalhuisRepository, SourceTaalhuisRepository],
    exports: [TaalhuisRepository],
})
export class TaalhuisModule {}
