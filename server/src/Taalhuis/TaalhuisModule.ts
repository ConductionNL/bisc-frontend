import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    providers: [CreateTaalhuisService, TaalhuisResolver, TaalhuisRepository],
    exports: [],
    imports: [CommonGroundAPIModule],
})
export class TaalhuisModule {}
