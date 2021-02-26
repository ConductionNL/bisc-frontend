import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { ProgramModule } from 'src/Program/ProgramModule'

import { CreateTaalhuisService } from './CreateTaalhuisService'
import { GroupRepository } from './GroupRepository'
import { SourceTaalhuisRepository } from './SourceTaalhuisRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    imports: [CommonGroundAPIModule, ProgramModule],
    providers: [CreateTaalhuisService, TaalhuisResolver, TaalhuisRepository, SourceTaalhuisRepository, GroupRepository],
    exports: [TaalhuisRepository],
})
export class TaalhuisModule {}
