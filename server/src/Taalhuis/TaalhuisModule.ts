import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { SourceTaalhuisRepository } from './SourceTaalhuisRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [CreateTaalhuisService, TaalhuisResolver, TaalhuisRepository, SourceTaalhuisRepository],
    exports: [TaalhuisRepository],
})
export class TaalhuisModule {}
