import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { ProgramModule } from 'src/Program/ProgramModule'

import { CreateTaalhuisService } from './CreateTaalhuisService'
import { GroupRepository } from './GroupRepository'
import { SourceTaalhuisRepository } from '../CommonGroundAPI/wrc/SourceTaalhuisRepository'
import { TaalhuisRepository } from '../CommonGroundAPI/cc/TaalhuisRepository'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    imports: [CommonGroundAPIModule, ProgramModule],
    providers: [CreateTaalhuisService, TaalhuisResolver, TaalhuisRepository, SourceTaalhuisRepository, GroupRepository],
    exports: [TaalhuisRepository],
})
export class TaalhuisModule {}
